
const async = require('async');
class Kline {
  constructor(ws, markets) {
    this.ws = ws;
    this.Kline0 = {};
    this.Kline1 = {};

    var q = Object.keys(markets);
    for (var i = 0; i < q.length; i++) {
      this.Kline0[q[i]] = {};
      this.Kline1[q[i]] = {};
      for (var j = 0; j < markets[q[i]].length; j++) {
        this.Kline0[q[i]][markets[q[i]][j]] = 0;
        this.Kline1[q[i]][markets[q[i]][j]] = 0;
      }
    }
    // console.log(this.Kline0,"init kline");
  }
  getMarket(markets, type, fn) {
    const _this = this;
    var bases = Object.keys(markets);
    async.eachLimit(bases, 2, function (base, cb) {
      async.eachLimit(markets[base], 2, function (market, cb1) {
        _this.getOpen(_this.ws, market, type, function (err, res) {
          if (!err) {
            if (type == 0) {
              _this.Kline0[base][market] = res;
            } else {
              _this.Kline1[base][market] = res;
            }
          }
          return cb1();
        });
      }, function (err) {
        return cb();
      });
    }, function (err) {
      return fn();
    });

  }
  getOpen(ws, market, type, fn) {
    const app = this.app;
    const _b0 = function () {
      if (type == 0) { 
        return new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 1000; //今天0点
      } else {
        return parseInt((new Date().getTime() - (60*1000)) / 1000);
      }
    }();
    // kline 协议接口
    // http://112.198.14.202:6699/index.php?s=/2&page_id=20
    const o = { method: 'kline.query', params: [market, _b0, _b0, 60] };
    ws.send(o, function (data) {
      if (data.id == null ||
        data.error != null ||
        data.result == null ||
        data.result.length != 1 ||
        data.result[0].length != 8) {
          app.logger.error('Kline.getOpen message err', market, type, _b0, data);
        return fn(true);
      }
      return fn(null, Number(data.result[0][1]));
    });
  }
}

module.exports = Kline;

