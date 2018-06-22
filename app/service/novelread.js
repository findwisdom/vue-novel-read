'use strict';
const serverFile = require('../public/serverFile')
const fs = require('fs')
const util = require('util')
const readAsync = util.promisify(fs.readFile)
const Service = require('egg').Service;

class NovelreadService extends Service {
    constructor(ctx) {
        super(ctx);
        this.root = 'http://www.sjtxt.la/soft/1/Soft_001_1.html';
    }
    
    async bookread(params) {
        const { ctx } = this;
        let data = fs.readFileSync(serverFile + '/' + params.href + '.txt','utf-8')
        return data
    }
    
}

module.exports = NovelreadService;
