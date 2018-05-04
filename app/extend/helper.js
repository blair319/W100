const _ = require("lodash");

module.exports = {
    pre(m, argRule) {
        //将query和body合并到arg中
        this.ctx.arg = _.merge(this.ctx.query, this.ctx.request.body);
        this.ctx.arg = _.merge(this.ctx.arg, this.ctx.headers);
        this.ctx.arg._time = new Date().getTime();
        this.ctx.arg.ip = this.ctx.ip;
        this.app.logger.info(m, this.ctx.ip, JSON.stringify(this.ctx.arg), "begin");
        //校验参数
        this.ctx.validate(argRule, this.ctx.arg);

        this.ctx.arg.source = this.ctx.arg.source.toLowerCase(); // 统一转为小写
    },
    end(m) {
        let ptime = new Date().getTime() - this.ctx.arg._time;
        //打印det日志
        this.app.logger.info(m,
            this.ctx.ip,
            JSON.stringify(this.ctx.arg),
            JSON.stringify(this.ctx.body), "end",
            ptime
        );

        //输出json格式化日志
        let jsonstring = _.merge(this.ctx.arg, this.ctx.body);
        this.app.getLogger('weexLogger').info(JSON.stringify(jsonstring));
        // 添加活跃用户
        this.service.stat.buildDau(this.ctx.arg);
        this.service.stat.handleTime(ptime);

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