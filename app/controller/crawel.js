'use strict';

const Controller = require('egg').Controller;

class CrawelController extends Controller {
    constructor(ctx) {
        super(ctx);
        
        this.createRule = {
        };
    }
    
    async index() {
        const { ctx } = this;
        ctx.service.crawel.bookCrawel();
        ctx.body = '请求启动'
    }
    
    async aLimit() {
        const { ctx } = this;
        ctx.service.crawel.aLimit();
        ctx.body = '请求启动'
    }
    
}

module.exports = CrawelController;
