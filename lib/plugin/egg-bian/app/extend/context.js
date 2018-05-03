
'use strict';
const async = require("async")
const binance = require('./node-binance-api.js');
binance.options({
    'APIKEY': '9Jz5altbEIS2f0IPiVrYNosmzijUtezUfC44EW406o5FewnQK0rwYq7Ndl4ssV5x',
    'APISECRET': 'HLtF2z2Yx9NzFV2kyQUOrFUZz57ui94sOv4ZxVPCJXudmS4Tc23P4SUmgrFTCudT'
});
var val = {};
module.exports = {
    bian: {
        reset24hr(markets, fn) {
            console.log("egg-bian.reset24hr begin");
            let _this = this;
            async.series({
                s1: function (cb) {
                    _this.reset24hrticker(markets, cb);
                }, s2: function (cb) {
                    cb();
                }
            }, function (err) {
                console.log("egg-bian.reset24hr end");
                return fn();
            });
        },
        reset24hrticker(markets, fn) {
            console.log("egg-bian.reset24hrticker begin");
            const _this = this;
            async.eachLimit(markets, 2, function (market, cb) {
                binance.prevDay(_this.adapterSymbol(market), function (error, ticker) {
                    if (error) {
                        console.log("egg-bian.reset24hrticker error", error.body);
                        return cb();
                    }
                    if (val[market] == null) {
                        val[market] = {};
                    }
                    val[market] = {
                        count: ticker.count * ((parseFloat(ticker.highPrice) + parseFloat(ticker.lowPrice) / 2)),//此数据为计算数据 不真实
                        priceChange: _this.adapterPriceFormat(ticker.priceChange),
                        priceChangePercent: ticker.priceChangePercent + "%",
                        lastPrice: ticker.lastPrice,
                    };
                    return cb();
                });
            }, function (err) {
                console.log("egg-bian.reset24hrticker end");
                return fn();
            });

        },
        adapterPriceFormat(price) {
            return "$" + Math.abs(parseFloat(price).toFixed(4) );
        },
        adapterSymbol(market) {
            return market + "T";
        }, getLmitTime(h) {
            return new Date().getTime() - 1000 * 60 * 60 * h;
        },
        get24hr() {
            return [{
                symbol: "ETCUSD",
                count: "0",
                priceChange: "$0.01",
                priceChangePercent: "0.01%",
                lastPrice: "11.111"
            }];
            // return val;
        }
    }
};












