
'use strict';
const async = require("async");
const https = require('https');
var val = {};

module.exports = {
    okex: {
        request(url, fn) {
            https.get(url, (res) => {
                var data = "";
                res.on('data', (d) => {
                    data += d;
                });
                res.on('end', () => {
                    data = JSON.parse(data);
                    return fn(null, data);
                });

            }).on('error', (e) => {
                console.error(e);
                return fn(true);
            });
        }, reset24hr(markets, fn) {
            let _this = this;
            async.series({
                s1: function (cb) {
                    _this.reset24hrticker(markets, cb);
                }, s2: function (cb) {
                    _this.reset24hrkline(markets, cb);
                }
            }, function (err) {
                return fn();
            });
        },
        reset24hrticker(markets, fn) {
            console.log("egg-okex.reset24hrticker begin");
            let _this = this;
            async.eachLimit(markets, 2, function (market, cb) {
                _this.request('https://www.okex.com/api/v1/ticker.do?symbol=' + _this.getSymbol(market),
                    function (err, ourRes) {
                        if (err) {
                            console.log("egg-okex.reset24hrticker error", err);
                            return cb();
                        }
                        if (val[market] == null) {
                            val[market] = {};
                        }
                        val[market].count = ourRes.ticker.vol;
                        val[market].lastPrice = ourRes.ticker.last;

                        return cb();
                    });
            }, function (err) {
                console.log("egg-okex.reset24hrticker end");
                return fn();
            });
        }, reset24hrkline(markets, fn) {
            console.log("biegg-okex.reset24hrkline begin");
            let _this = this;
            async.eachLimit(markets, 2, function (market, cb) {
                _this.request('https://www.okex.com/api/v1/kline.do?symbol=' + _this.getSymbol(market) + '&type=1hour&since=' +
                    (new Date().getTime() - (1000 * 60 * 60 * 25)),
                    function (err, ourRes) {
                        if (err) {
                            console.log("egg-okex.reset24hrkline error", err);
                            return cb();
                        }
                        if (val[market] == null) {
                            val[market] = {};
                        }
                        let t = _this.getPriceChange(val[market].lastPrice, ourRes[0][1]);
                        val[market].priceChange = t.priceChange;
                        val[market].priceChangePercent = t.priceChangePercent;

                        return cb();
                    });
            }, function (err) {
                return fn();
                console.log("bian end");
            });
        },
        getPriceChange(v1, v2) {
            return {
                priceChange: "$" + Math.abs((v1 - v2).toFixed(4)),
                priceChangePercent: ((v1 - v2) / v2).toFixed(4) + "%"
            }
        },
        getSymbol(market) {
            return market.substr(0, market.length - 3) + "_" + market.substr(market.length - 3, market.length) + "T";

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












