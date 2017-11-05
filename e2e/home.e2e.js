const request = require('supertest');

const app = require('../app');

describe('Home API', function () {

  let agent;

  before(function(){
    agent = request(app);
  });

  after(function(){
    app
  });

  it('GET / -> Responds with 200 status', function (done) {
    agent
      .get('/')
      .expect(200, done);
  });

  it('GET /api -> Responds with 404 status and { success: false, error: "Not found. " }', function (done) {
    agent
      .get('/api')
      .expect(404, { success: false, error: 'Not found. ' }, done);
  });

  it('GET /api?lang=es -> Responds with 404 status and { success: false, error: "No se encuentra. " }', function (done) {
    agent
      .get('/api?lang=es')
      .expect(404, { success: false, error: 'No se encuentra. ' }, done);
  });

});