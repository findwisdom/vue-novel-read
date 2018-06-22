const request = require('superagent');
const async = require('async');
const path = require('path')
const os = require('os')
const fs = require('fs');
const cheerio = require("cheerio");
const Service = require('egg').Service;

const serverFile = require('../public/serverFile')
const root = 'http://www.sjtxt.la'

let count = 0
// 创建小说文件夹
function mkDirsSync ( dirname ) {
    if (fs.existsSync( dirname )) {
        return true
    } else {
        if (mkDirsSync( path.dirname(dirname)) ) {
            fs.mkdirSync( dirname )
            return true
        }
    }
}

class CrawelService extends Service {
    constructor(ctx) {
        super(ctx);
        this.root = 'http://www.sjtxt.la/soft/1/Soft_001_1.html';
    }
    
    async aLimit () {
        let chapterArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        async.eachLimit(chapterArr, 100, async function (chapterUrl, callback) {
            console.log(chapterUrl)
            callback()
        });
    }
    
    // 抓取小说页面列表
    async bookCrawel() {
        console.log('开始抓取任务')
        const self = this
        const {ctx} = this;
        const result = await request.get(`${root}/soft/quanben/index_1.html`);
        let novelArr = [];
        let $ = cheerio.load(result.text);
        let bookList = $('.wrap .list .listBox ul li')
        for (let i = 0; i <bookList.length; i++) {
            let item = bookList[i]
            let obj = {}
            // 抓取小说页面列表
            obj.title = $(item).children('a').text()
            obj.url = $(item).children('a').attr('href')
            obj.lastChapter = $(item).children('div').children('a').text().split('：')[1]
            obj.img = $(item).children('a').children('img').attr('src')
            obj.description = $(item).children('div.u').text()
            obj.author = $(item).children('div.s').children('br').prev()
            obj.code = obj.img.split('.')[0].split('/')
            obj.count = obj.author[0].next.data.split('：')[1]
            obj.author = obj.author[0].prev.data.split('：')[1]
            obj.code = Number(obj.code[obj.code.length - 2])
            obj.tag = await self.bookTagCrawel(obj.url)
            await self.bookChapterCrawel(obj.code, obj.tag)
            await this.insertNovel(obj)
            novelArr.push(obj)
        }
        // 小说信息存入数据库
        return novelArr
    }
    
    // 抓取小说类别
    async bookTagCrawel (url)  {
        const res = await request.get(root + url)
        const $ = cheerio.load(res.text)
        let tag = ''
        tag = $('div.position').children('span').children('a').eq(1).text()
        return tag
    }
    
    // 抓取小说章节列表
    async bookChapterCrawel (code, tag)  {
        const _self = this
        const url = `${root}/book/${code}/`
        const res = await request.get(url)
        let chapterArr = []
        let $ = cheerio.load(res.text)
        let chapterList = $('div#info .pc_list ul li')
        for (let i = 0; i < chapterList.length; i++) {
            let item = chapterList[i]
            let obj = {}
            let href = $(item).children('a').attr('href')
            let title = $(item).children('a').text()
            obj.code = code
            obj.order = Number(href.split('.')[0])
            obj.href = code + '/' + href.split('.')[0]
            obj.title = title
            chapterArr.push(obj)
        }
        // 针对爬取详情并发做出限制
        async.eachLimit(chapterArr, 50, function (chapterUrl, callback) {
            let url = `${root}/book/${chapterUrl.href}.html`
            console.log(chapterUrl.href)
            _self.bookCrawlDetail(url, chapterUrl, tag, callback)
        });
    }
    
    // 抓取小说详细内容
    async bookCrawlDetail (url, obj, tag, callback) {
        console.time('  耗时');
        const _self = this
        const res = await request.get(url)
        let path = obj.href + '.txt'
        let $ = cheerio.load(res.text)
        let title = $('div#info .txt_cont').children('h1').html()
        let text = $('div#content1').html()
        let content = title + '\n' + text
        let mkdirResult1 = mkDirsSync(serverFile)
        let mkdirResult2 = mkDirsSync(serverFile + '/' + obj.code)
        fs.exists(serverFile + '/' + path, function (exists) {
            if(exists) {
                callback()
                _self.insertChapter(obj, tag)
                console.log("文件存在！");
            }else {
                fs.writeFile(serverFile + '/' + path, content, function (err) {
                    if (err) {
                        callback()
                        _self.crawlDetailErr()
                    } else {
                        _self.insertChapter(obj, tag)
                        console.log(title + ' 下载成功')
                        callback()
                    }
                })
            }
        });
    }
    
    // 合并小说文件生成新的txt
    async compoundTxt (url, code) {}
    
    // 小说信息存入数据库
    async insertNovel (book) {
        const {ctx} = this;
        ctx.model['Novelinfo'].find({code: book.code}, {code:1}).exec(function (err, docs) {
            if (err) {
                console.log('书籍信息存入失败了')
            } else {
                if (docs.length === 0) {
                    ctx.model['Novelinfo'].create(book)
                }
            }
        })
    }
    
    // 小说章节信息存入数据库
    async insertChapter (obj, tag) {
        const {ctx} = this;
        let db = this.categoryDb(tag)
        ctx.model[db].find({href: obj.href}, {code:1}).exec(function (err, docs) {
            if (err) {
                console.log('章节存入出错啦')
            } else {
                if (docs.length === 0) {
                    ctx.model[db].create(obj)
                }
            }
        })
    }
    
    // 小说章节信息存入数据库
    categoryDb (name) {
        let x = ''
        switch (name)
        {
            case '武侠小说':x = 'Wuxia';
                break;
            case '玄幻小说':x = 'Xuanhuan';
                break;
            case '都市言情':x = 'Dushi';
                break;
            case '恐怖灵异':x = 'Kongbu';
                break;
            case '现代文学':x = 'Xiandai';
                break;
            case '侦探推理':x = 'Zhengtan';
                break;
            case '科幻小说':x = 'Kehuan';
                break;
            case '穿越架空':x = 'Chuanyue';
                break;
            case '古典名著':x = 'Gudian';
                break;
            case '历史军事':x = 'Lishi';
                break;
            case '网游小说':x = 'Wangyou';
                break;
            default: x = 'iandai'
                break;
        }
        return x
    }
    
    crawlDetailErr () {
        console.log('写入详情文件出错数据出错')
    }
    
}

module.exports = CrawelService;

