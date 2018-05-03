const _ = require("lodash");

module.exports = {
    pre(m, argRule) {
        //将query和body合并到arg中
        this.ctx.arg = _.merge(this.ctx.query, this.ctx.request.body);
        this.ctx.arg = _.merge(this.ctx.arg, this.ctx.headers);
        this.ctx.arg._time = new Date().getTime();
        this.app.logger.info(m, this.ctx.ip, JSON.stringify(this.ctx.arg), "begin");
        //校验参数
        this.ctx.validate(argRule, this.ctx.arg);
    },
    end(m) {
        this.app.logger.info(m,
            this.ctx.ip,
            JSON.stringify(this.ctx.arg),
            JSON.stringify(this.ctx.body), "end",
            new Date().getTime() - this.ctx.arg._time);

    },
    getPriceChange(v1, v2) {
        if (v2 == null ||
            v2 == 0) {
            return {
                priceChange: "$0",
                priceChangePercent: "0.00%"
            }
        }
        v1 == null ? 0 : v1;
        return {
            priceChange: "$" + Math.abs((v1 - v2).toFixed(4)),
            priceChangePercent: ((v1 - v2) / v2 * 100).toFixed(4) + "%"
        }
    },
    getMarkets() {
        return {
            "USD": [
                'BTCUSD',
                'BCHUSD',
                'LTCUSD',
                'ETHUSD',
                'ZECUSD',
                'DASHUSD',
                'ETCUSD',
            ],
            "BTC": [
                'BCHBTC',
                'LTCBTC',
                'ETHBTC',
                'ZECBTC',
                'DASHBTC',
                'ETCBTC',
            ]
        }
    }
};