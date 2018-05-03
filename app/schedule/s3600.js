module.exports = {
    schedule: {
        interval: '3600m', 
        type: 'all', 
    },
    async task(ctx) {
        console.log("kline loop begin");
        ctx.startKline();  
    },
};