'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/w100/',  controller.home.index);
  router.get('/w100/v1/user/asset',  controller.v1.user.user.asset);//获取用户资产
  router.post('/w100/v1/stat', controller.v1.stat.stat.stat);//统计数据上报
  router.get('/w100/v1/quot/ranking',  controller.v1.price.index.ranking); //获取涨跌排行榜
  router.get('/w100/v1/transaction/getMarkets', controller.v1.transaction.index.getMarkets);//获取所有交易对
  router.get('/w100/v1/aid/config/banner',  controller.v1.aid.config.banner);//banner公告
  router.get('/w100/v1/aid/exchage/quot', controller.v1.aid.exchange.quot);//获取其他交易所数据
};
