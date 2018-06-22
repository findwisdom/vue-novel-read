'use strict';
const Service = require('egg').Service;

class NovelinfoService extends Service {
    constructor(ctx) {
        super(ctx);
        this.root = 'http://www.sjtxt.la/soft/1/Soft_001_1.html';
    }
    
    async booklist() {
        const { ctx } = this;
        const result = await ctx.model.Novelinfo.find({},{title: 1, code: 1, author: 1, tag: 1, count: 1, lastChapter:1, description: 1});
        return result;
    }
    
    async bookchapter(params) {
        const { ctx } = this;
        const tag = await ctx.model.Novelinfo.findOne({code: params.id},{tag: 1})
        const collection = ctx.service.crawel.categoryDb(tag.tag)
        const result = await ctx.model[collection].find({code: params.id}).sort({order: 1})
        return result;
    }
    
    checkSuccess(result) {
        if (result.status !== 200) {
            const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error';
            this.ctx.throw(result.status, errorMsg);
        }
        if (!result.ok) {
            this.ctx.throw(500, 'remote response error', { data: result.data });
        }
    }
}

module.exports = NovelinfoService;
