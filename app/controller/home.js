const fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller;
class HomeController extends Controller{
    async index(){
        const { ctx } = this;
        if (this.ctx.isAuthenticated()) {
            const file = path.resolve(this.app.config.static.dir, 'index.html');
            this.ctx.set('Content-Type', 'text/html');
            this.ctx.body = await fs.readFileSync(file);
        } else {
            ctx.session.returnTo = ctx.path;
            ctx.body = `
                <div>
                  <h2>${ctx.path}</h2>
                  <hr>
                  Login with
                  <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
                  <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a>
                  <hr>
                  <a href="/">Home</a> | <a href="/user">User</a>
                </div>
              `;
        }
    }
}
module.exports = HomeController;
