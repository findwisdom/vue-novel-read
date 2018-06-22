const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
    constructor(ctx) {
        super(ctx);
    }
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            interval: '100000000000000000000s', // 1 分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        };
    }
    
    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        const { ctx } = this;
        const res = await ctx.service.crawel.bookCrawel();
    }
}

module.exports = UpdateCache;
