
'use strict';
const async = require("async");
const hbsdk = require('./hbsdk');

var val = {};

module.exports = {
    huobi: {
        reset24hr(markets, fn) {
            let _this = this;
            _this.reset24hrticker(markets, fn);
        },
        reset24hrticker(markets, fn) {
            console.log("egg-huobi.reset24hrticker begin");
            let _this = this;
            async.eachLimit(markets, 2, function (market, cb) {
                hbsdk.get_market_detail(_this.adapterSymbol(market)).then(data => {
                    if (data == null) {
                        console.log("egg-huobi.reset24hrticker get Result error");
                        return cb();
                    }
                    data = data.tick;
                    if (val[market] == null) {
                        val[market] = {};
                    }
                    val[market].count = data.vol.toFixed(4);
                    val[market].lastPrice = data.close.toFixed(4);
                    let t = _this.getPriceChange(data.close, data.open);
                    val[market].priceChange = t.priceChange;
                    val[market].priceChangePercent = t.priceChangePercent;
                    return cb();
                });
            }, function (err) {
                console.log("egg-huobi.reset24hrticker  end");
                return fn();
            });
        },
        getPriceChange(v1, v2) {
            return {
                priceChange: "$" + Math.abs((v1 - v2).toFixed(4)),
                priceChangePercent: ((v1 - v2) / v2 * 100).toFixed(4) + "%"
            }
        },
        adapterSymbol(market) {
            return market.toLowerCase() + "t";
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












