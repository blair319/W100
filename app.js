// app.js
module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    ctx.logger.info("init server begin");
    ctx.weex_ws_initws(ctx.helper.getMarkets(), function () {
      ctx.weex_ws_buildKline(0);
      ctx.weex_ws_buildKline(1);
      // ctx.tg = app.tg;
      app.tg.resetUserInfo(()=>{
        console.log("tg end");
      });
      ctx.logger.info("init server end");
    });
  });
};




