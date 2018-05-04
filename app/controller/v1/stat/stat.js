'use strict';

const Controller = require('egg').Controller;
const _ = require("lodash");

class StatController extends Controller {
    async stat() {
        const { ctx, service, app } = this;
        ctx.helper.pre("stat", {
            ver: { type: 'string' },
            source: { type: 'string' },
            uid: { type: 'string' },
            token: { type: 'string' },
            event_type:{type: 'string'},
            event_info:{type: 'object'},
        });
        service.stat.buildStatData(ctx.arg);
        ctx.body = {
            code: 0,
            message: "OK",
        };
        ctx.helper.end("stat");
    }
}

module.exports = StatController;
