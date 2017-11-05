const request = require('supertest');

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');

describe('Tags API /api/tags', function(){

    let agent;

    before(async function(){
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://example.com/TestingDB', {
            useMongoClient: true
        });
        mongoose.models = {};
        mongoose.modelSchemas = {};
        await mongodbFixtures.initTags();
        const app = require('../app');
        agent = request.agent(app);
    });

    it('GET /api/tags -> should return with 200 status', function(done){
        agent
            .get('/api/tags')
            .expect(200, done);
    });

    it('GET /api/tags -> should return an object with property success === true', function(done){
        agent
            .get('/api/tags')
            .expect(function(res){
                if(res.body.success !== true){
                    throw new Error('Response success not true, returned ' + res.body.success);
                }
            })
            .end(done);
    });

    it('GET /api/tags -> should return an object with property rows as array of length === 1', function(done){
        agent
            .get('/api/tags')
            .expect(function(res){
                if(res.body.rows.length !== 1){
                    throw new Error('Response rows not an array of length === 1, returned array: ' + res.body.rows);
                }
            })
            .end(done);
    });

    it('GET /api/tags -> should return an object with first element of rows with property name === "work"}', function(done){
        agent
            .get('/api/tags')
            .expect(function(res){
                if(res.body.rows[0].name !== 'work'){
                    throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                }
            })
            .end(done);
    });

});