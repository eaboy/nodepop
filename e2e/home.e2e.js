const request = require('supertest');

const app = require('../app');

describe('Home API', function () {

  let home;

  before(function(){
    home = request(app);
  });

  it('GET / -> Responds with 200 status', function (done) {
    home
      .get('/')
      .expect(200, done);
  });

  it('GET /api -> Responds with 404 status', function (done) {
    home
      .get('/api')
      .expect(404, done);
  });

});