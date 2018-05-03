
const WebSocket = require('ws');

class WS {
  constructor(wsurl) {
    this.wsurl = wsurl;// 类中变量
    this.id = 0;
    this.pool = {};
  }

  open(fn) {
    const _this = this;
    this.ws = new WebSocket(this.wsurl);
    this.ws.on('open', function() {
      console.log('WebSocket open');
      return fn();
    });

    this.ws.on('message', function incoming(data) {
      // console.log("WS.open.message", data);
      try {
        data = JSON.parse(data);
        _this.pool[data.id](data);
      } catch (error) {
        console.log('WS.open.message err', error, data);
      }

    });
  }

  send(arg, cb) {
    this.pool[this.id] = cb;
    arg.id = this.id++;
    this.ws.send(JSON.stringify(arg));
  }

}
module.exports = WS;
