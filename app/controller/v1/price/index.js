'use strict';

const Controller = require('egg').Controller;
const _ = require("lodash");

class IndexController extends Controller {
    async ranking() {
        const { ctx, service, app } = this;
        ctx.helper.pre("ranking",
            {
                ver: { type: 'string' },
                source: { type: 'string' },
                uid: { type: 'string' },
                token: { type: 'string' }
            });
            
        const k0 = ctx.weex_ws_get0Kline();
        const k1 = ctx.weex_ws_get1Kline();

        const markets = ctx.helper.getMarkets()["USD"];
        var t = [];

        for (var i = 0; i < markets.length; i++) {
            let market = markets[i];
            let tt = ctx.helper.getPriceChange(k1["USD"][market], k0["USD"][market]);
            tt["market"] = market;
            t.push(tt);
        }

        let d = _.orderBy(t, ['priceChangePercent'], ['desc']); 

        let res = {
            rise: [],
            fall: []
        };
        for (var i = 0; i < d.length; i++) {
            if (d[i].priceChangePercent.indexOf("-") < 0) {
                res.rise.push(d[i]);
            } else {
                res.fall.push(d[i]);
            }

        }

        ctx.body = {
            code: 0,
            data: res,
            message: "OK",
        };
        ctx.helper.end("ranking");
    }
    makeVal(v1, v2) {
        if (i++ % 2 == 0) {
            return {
                priceChange: "$" + Math.abs((v1 - v2).toFixed(2)),
                priceChangePercent: "-" + ((v1 - v2) / v2).toFixed(2) + "%"
            }
        }
        return {
            priceChange: "$" + Math.abs((v1 - v2).toFixed(2)),
            priceChangePercent: ((v1 - v2) / v2).toFixed(2) + "%"
        }
    }
}

var i = 0;
module.exports = IndexController;
