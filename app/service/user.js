'use strict';
const Service = require('egg').Service;

class UserService extends Service {
    async getUserAsset(token) {
        const { ctx, service, app } = this;
        //获取用户资产
        var userAsset = await app.weexHttps.getUserAsset(this, token);
        if (userAsset.code != 0) {
            return userAsset;
        }
        //获取当天0点的值
        var kline0 = app.weexWs.get0Kline()["USD"];
        //获取当前汇率
        var rate = app.weexHttps.getRate();

        var total = 0;
        var marketsKey = Object.keys(userAsset.data.markets);
        for (var i = 0; i < marketsKey.length; i++) {
            total = kline0[marketsKey[i]] * userAsset.data.markets[marketsKey[i]].v;
        }
        total += userAsset.data.USD;
        var ret = ctx.helper.getPriceChange(userAsset.data.total, total);
        ret.cny = "￥" + (userAsset.data.total * Number(rate.cash_buy_rate)).toFixed(2);
        ret.usd = "$" + (userAsset.data.total).toFixed(2)
        return {
            code: 0,
            data: ret,
            massage: "OK"
        };
    }
}

module.exports = UserService; 