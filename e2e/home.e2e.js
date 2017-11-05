const request = require('supertest');

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');

describe('Home API', function () {

  let agent;

  before(async function(){
    await mockgoose.prepareStorage();
    await mongoose.connect('mongodb://example.com/TestingDB', {
        useMongoClient: true
    });
    mongoose.models = {};
    mongoose.modelSchemas = {};
    await mongodbFixtures.initUsers();
    const app = require('../app');
    agent = request.agent(app);
  });

  it('GET / -> Should respond with 200 status', function (done) {
    agent
      .get('/')
      .expect(200, done);
  });

  it('GET /api -> Should respond with 404 status and { success: false, error: "Not found. " }', function (done) {
    agent
      .get('/api')
      .expect(404, { success: false, error: 'Not found. ' }, done);
  });

  it('GET /api?lang=es -> Should respond with 404 status and { success: false, error: "No se encuentra. " }', function (done) {
    agent
      .get('/api?lang=es')
      .expect(404, { success: false, error: 'No se encuentra. ' }, done);
  });

  describe('Login API', function(){

    it('POST /api/authenticate -> Should respond with 200 status', function (done) {
      agent
        .post('/api/authenticate')
        .expect(200, done);
    });

    it('POST /api/authenticate -> With wrong email/password should respond { error: \'Unauthorized. Invalid credentials\', success: false}', function (done) {
      agent
        .post('/api/authenticate')
        .send({email: 'user@example.com', password: '12345'})
        .expect(200,{ error: 'Unauthorized. Invalid credentials', success: false}, done);
    });

    it('POST /api/authenticate -> With correct email/password should respond with success: true and a token', function (done) {
      agent
        .post('/api/authenticate')
        .send({email: 'user@example.com', password: '1234'})
        .expect(function(res) {
          if(!res.body.success || !res.body.token){
            throw new Error('Unexpected response: ' + res.body);
          }
        })
        .end(done);
    });

  })

});