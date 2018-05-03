
'use strict';
const async = require("async");
const http = require('http');
var val = {};

module.exports = {
    ZB: {
        request(url, fn) {
            http.get(url, (res) => {
                let _data = "";
                res.on('data', (d) => {
                    _data += d;
                });
                res.on('end', () => {
                    try {
                        _data = JSON.parse(_data);
                        return fn(null, _data);
                    } catch (error) {
                        console.log("egg-ZB.request parse json error", url, error, _data);
                        return fn(true);
                    }
                });
            }).on('error', (e) => {
                console.error("egg-ZB.request error", url, e);
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
            console.log("egg-ZB.reset24hrticker begin");
            let _this = this;
            async.eachLimit(markets, 2, function (market, cb) {
                let symbol = _this.getSymbol(market);
                _this.request('http://api.zb.com/data/v1/ticker?market=' + symbol,
                    function (err, ourRes) {
                        if (!err) {
                            if (val[market] == null) {
                                val[market] = {};
                            }
                            val[market].count = ourRes.ticker.vol;
                            val[market].lastPrice = ourRes.ticker.last;
                        }
                        return cb();
                    });
            }, function (err) {
                console.log("egg-ZB.reset24hrticker end");
                return fn();
            });
        }, reset24hrkline(markets, fn) {
            console.log("egg-ZB.reset24hrkline begin");
            let _this = this;
            async.eachLimit(markets, 1, function (market, cb) {
                let symbol = _this.getSymbol(market);
                _this.request('http://api.zb.com/data/v1/kline?market=' + symbol + '&type=1hour&since=' +
                    (new Date().getTime() - (1000 * 60 * 60 * 25)),
                    function (err, ourRes) {
                        if (!err) {
                        ourRes = ourRes.data;
                            if (val[market] == null) {
                                val[market] = {};
                            }
                            console.log(val[market].lastPrice, ourRes[0][1]);
                            let t = _this.getPriceChange(val[market].lastPrice, ourRes[0][1]);
                            val[market].priceChange = t.priceChange;
                            val[market].priceChangePercent = t.priceChangePercent;
                        }
                        setTimeout(function () {
                            return cb()
                        }, 1000);
                    });
            }, function (err) {
                return fn();
                console.log("ZB end");
            });
        },
        getSymbol(market) {
            return market.substr(0, market.length - 3) + "_" + market.substr(market.length - 3, market.length) + "T";

        },
        getPriceChange(v1, v2) {
            return {
                priceChange: "$" + Math.abs((v1 - v2).toFixed(2)),
                priceChangePercent: (((v1 - v2) / v2).toFixed(4)) * 100 + "%"
            }
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












