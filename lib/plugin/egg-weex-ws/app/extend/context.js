
'use strict';
const WS = require('./WS.js');
const Kline = require('./Kline.js');
var ws, kline, _markets;

module.exports = {
  weex_ws_initws(markets, fn) {
    const { ctx, service, app } = this;
    const _this = this;
    _markets = markets;

    app.logger.info("weex-wx.initws begin", app.config.wsurl);
    ws = new WS(this.app.config.wsurl);
    ws.open(function () {
      app.logger.info("weex-wx.initws end open", app.config.wsurl);
      kline = new Kline(ws, _markets);
      return fn();
    });
  },

  weex_ws_buildKline(type) {
    const { ctx, service, app } = this;
    app.logger.info("weex-wx.buildKline", type, "begin");
    kline.getMarket(_markets, type, function () {
      app.logger.info("weex-wx.buildKline", type, "end");
    });
  },
  weex_ws_get0Kline() {
    return kline.Kline0;
  },
  weex_ws_get1Kline() {
    return kline.Kline1;
  },
};












