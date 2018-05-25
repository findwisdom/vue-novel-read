'use strict';

const Controller = require('egg').Controller;

class NovelinfoController extends Controller {
    constructor(ctx) {
        super(ctx);
        
        this.createRule = {
        };
    }
    
    async index() {
        const { ctx } = this;
        ctx.body = await ctx.service.novelinfo.booklist();
    }
    async show() {
        const { ctx } = this;
        ctx.body = await ctx.service.novelinfo.bookchapter({id: ctx.params.id});
    }
    
}

module.exports = NovelinfoController;
