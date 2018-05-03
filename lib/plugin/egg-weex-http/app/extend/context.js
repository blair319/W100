var rate;
/**
 * 获取汇率
 * @param {*} _this 
 */
var setRate = async function (_this) {
    const app = _this.app;
    app.logger.info("egg-weex-http.setRate begin");
    try {
        const result = await app.curl(app.config.weexurl + 'exchange/v1/market/currency/rate', {
            method: 'GET',
            contentType: 'json',
            timeout: 1000,
            data: {
                from_currency: "CNY",
                to_currency: "USD"
            },
            dataType: 'json',
        });

        if (result != null &&
            result.data != null &&
            result.data.code == 0) {
            rate = result.data.data;
        } else {
            app.logger.error("egg-weex-http.setRate data err", result);
        }
        app.logger.info("egg-weex-http.setRate end", JSON.stringify(rate));
    } catch (err) {
        app.logger.error("egg-weex-http.setRate error", err);
    }
};

/**
 * 获取资产明细
 * http://112.198.14.202:6699/index.php?s=/2&page_id=150
 */
var getUserAsset = async function (_this, token) {
    const app = _this.app;
    app.logger.info("egg-weex-http.getUserAsset begin" , token);
    try {
        const result = await app.curl(app.config.weexurl + 'exchange/v1/account/asset/usd', {
            method: 'GET',
            contentType: 'json',
            timeout: 1000,
            data: {
                token: token
            },
            dataType: 'json',
        });
        if (result == null) {
            app.logger.error("egg-weex-http.getUserAsset result null", token);
            return {
                code: 1001,
                data: {},
                message: "weex http result null"
            };
        }
        if (result.data.code != 0) {
            app.logger.error("weex-http.getUserAsset1 result error", result);
            return result.data;
        }
        var data = result.data;
        var markets = {}; //所拥有的币
        var USD = 0;
        var assets = data.data.assets;
        for (var i = 0; i < assets.length; i++) {
            if (assets[i].asset == "USD") {
                USD = Number(assets[i].available);
                continue;
            }
            if (assets[i].available != "0" || assets[i].freeze != "0") {
                markets[assets[i].asset + "USD"] = {
                    v: Number(assets[i].available) + Number(assets[i].freeze),  // 可用资产 + 可用资产
                    n: Number(assets[i].market_value), //市值
                };
            }
        }
        return {
            code: 0,
            data: {
                total: Number(data.data.total_market_value),
                markets: markets,
                USD: USD
            },
            message: "OK"
        };
    } catch (err) {
        app.logger.error("egg-weex-http.getUserAsset error", err);
        return {
            code: 1001,
            data: {},
            message: "weex http error " + err.message
        };
    }
};


module.exports = {
    weex_http: {
        setRate: setRate,
        getUserAsset: getUserAsset,
        getRate() {
            return rate;
        }
    }
};












