'use strict';

const serverFile = require('../public/serverFile')

const Controller = require('egg').Controller;

class NovelreadController extends Controller {
    constructor(ctx) {
        super(ctx);
        
        this.createRule = {
        };
    }
    
    async index() {
        const { ctx } = this;
        ctx.body = await ctx.service.novelread.bookread({href: ctx.query.href});
    }
    
}

module.exports = NovelreadController;
