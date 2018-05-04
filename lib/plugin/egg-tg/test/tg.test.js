'use strict';

const mock = require('egg-mock');

describe('test/tg.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tg-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, tg')
      .expect(200);
  });
});
