module.exports = {
    schedule: {
        interval: '10s',
        type: 'all',
    },
    async task(ctx) {
        ctx.weex_ws_buildKline(1);
        ctx.weex_http.setRate(ctx);
        ctx.app.tg.resetUserInfo(()=>{
            console.log("tg end");
          });
    },
    resetOtherInfo() {
        ctx.bian.reset24hr(ctx.helper.getMarkets()["USD"], function () {
            console.log(ctx.ZB.get24hr());
            console.log("init ZB end");
        });

        ctx.huobi.reset24hr(ctx.helper.getMarkets()["USD"], function () {
            console.log(ctx.ZB.get24hr());
            console.log("init huobi end");
        });

        ctx.okex.reset24hr(ctx.helper.getMarkets()["USD"], function () {
            console.log(ctx.ZB.get24hr());
            console.log("init okex end");
        });

        ctx.ZB.reset24hr(ctx.helper.getMarkets()["USD"], function () {
            console.log(ctx.ZB.get24hr());
            console.log("init ZB end");
        });
    }
};