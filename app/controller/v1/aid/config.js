'use strict';

const Controller = require('egg').Controller;
const _ = require("lodash");

class ConfigController extends Controller {
    async banner() {
        const { ctx, service, app } = this;
        ctx.helper.pre("banner", {
            ver: { type: 'string' },
            source: { type: 'string' },
            uid: { type: 'string' },
            token: { type: 'string' },
            screen: { type: 'string' },
        });

        ctx.body = {
            code: 0,
            data: [
                { "type": 0, "imgurl": "http://chuantu.biz/t6/305/1525767305x-1404792891.png", deturl: "", id: "134e" },
                { "type": 1, "imgurl": "http://chuantu.biz/t6/305/1525767334x-1404792891.png", deturl: "http://www.baidu.com", id: "34e2" },
                { "type": 1, "imgurl": "http://chuantu.biz/t6/297/1524905116x-1404795690.png", deturl: "http://www.baidu.com", id: "we3" },
            ],
            message: "OK",
        };
        ctx.helper.end("banner");
    }
}

module.exports = ConfigController;
