'use strict';

const Controller = require('egg').Controller;
const _ = require("lodash");

class IndexController extends Controller {
    async getMarkets() {
        const { ctx, service, app } = this;

        ctx.helper.pre("getMarkets",
            {
                ver: { type: 'string' },
                source: { type: 'string' },
                uid: { type: 'string' },
                token: { type: 'string' }
            });

        const markets = ctx.helper.getMarkets();
        var results = [];

        var bases = Object.keys(markets);
        for (var i = 0; i < bases.length; i++) {
            let base = bases[i];
            results.push({
                base: base,
                markets: markets[base]
            });
        }
        ctx.body = {
            code: 0,
            data: results,
            message: "OK",
        };
        ctx.helper.end("getMarkets");
    }
}

module.exports = IndexController;
