'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async asset() {
        const { ctx, service, app } = this;

        ctx.helper.pre("getAsset", {
            ver: { type: 'string' },
            source: { type: 'string' },
            uid: { type: 'string' },
            token: { type: 'string' }
        });

        var res = await service.user.getUserAsset(this.ctx.arg.token);
        ctx.body = res;
        
        ctx.helper.end("getAsset");
    }
}

module.exports = UserController;
