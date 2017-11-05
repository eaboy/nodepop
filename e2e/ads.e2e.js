const request = require('supertest');

const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');

let agent;

describe('Ads API /api/ads', function(){

    before(async function(){
        await mockgoose.prepareStorage();
        await mongoose.connect('mongodb://example.com/TestingDB', {
            useMongoClient: true
        });
        mongoose.models = {};
        mongoose.modelSchemas = {};
        await mongodbFixtures.initAds();
        const app = require('../app');
        agent = request.agent(app);
    });

    it('GET /api/ads -> should return with 200 status', function(done){
        agent
            .get('/api/ads')
            .expect(200, done);
    });

    it('GET /api/ads -> should return an object with property success === true', function(done){
        agent
            .get('/api/ads')
            .expect(function(res){
                if(res.body.success !== true){
                    throw new Error('Response success not true, returned ' + res.body.success);
                }
            })
            .end(done);
    });

    it('GET /api/ads -> should return an object with property rows as array of length === 1', function(done){
        agent
            .get('/api/ads')
            .expect(function(res){
                if(res.body.rows.length !== 1){
                    throw new Error('Response rows not an array of length === 1, returned array: ' + res.body.rows);
                }
            })
            .end(done);
    });

    it('GET /api/ads -> should return an object with first element of rows with property name === "MacBook"', function(done){
        agent
            .get('/api/ads')
            .expect(function(res){
                if(res.body.rows[0].name !== 'MacBook'){
                    throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                }
            })
            .end(done);
    });

    it('GET /api/ads -> should return an object with first element of rows with property tags === ["work", "lifestyle"]', function(done){
        agent
            .get('/api/ads')
            .expect(function(res){
                if(res.body.rows[0].tags.toString() !== ['work', 'lifestyle'].toString()){
                    throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].tags}`);
                }
            })
            .end(done);
    });

    describe('Ads filters /api/ads?filterName=filter', function(){

        it('GET /api/ads?name=Mac -> should return an object with first element of rows with property name === "MacBook"', function(done){
            agent
                .get('/api/ads?name=Mac')
                .expect(function(res){
                    if(res.body.rows[0].name !== 'MacBook'){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?name=iPho -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?name=iPho')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/ads?tags=lifestyle -> should return an object with first element of rows with property tags === [ "lifestyle", "work" ]', function(done){
            agent
                .get('/api/ads?tags=lifestyle')
                .expect(function(res){
                    if(res.body.rows[0].tags.toString() !== ['work', 'lifestyle'].toString()){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].tags}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?tags=lifestyle,work -> should return an object with first element of rows with property tags === [ "lifestyle", "work" ]', function(done){
            agent
                .get('/api/ads?tags=lifestyle,work')
                .expect(function(res){
                    if(res.body.rows[0].tags.toString() !== ['work', 'lifestyle'].toString()){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].tags}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?tags=mobile -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?tags=mobile')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/ads?onSale=true -> should return an object with first element of rows with property name === "MacBook"', function(done){
            agent
                .get('/api/ads?onSale=true')
                .expect(function(res){
                    if(res.body.rows[0].name !== 'MacBook'){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?onSale=false -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?onSale=false')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/ads?price=700- -> should return an object with first element of rows with property name === "MacBook"', function(done){
            agent
                .get('/api/ads?price=700-')
                .expect(function(res){
                    if(res.body.rows[0].name !== 'MacBook'){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?price=800- -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?price=800-')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/ads?price=700-800 -> should return an object with first element of rows with property name === "MacBook"', function(done){
            agent
                .get('/api/ads?price=700-800')
                .expect(function(res){
                    if(res.body.rows[0].name !== 'MacBook'){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?price=800-900 -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?price=800-900')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/ads?price=-800 -> should return an object with first element of rows with property name === "MacBook"', function(done){
            agent
                .get('/api/ads?price=-800')
                .expect(function(res){
                    if(res.body.rows[0].name !== 'MacBook'){
                        throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                    }
                })
                .end(done);
        });

        it('GET /api/ads?price=-700 -> should return an object with property rows empty', function(done){
            agent
                .get('/api/ads?price=-700')
                .expect(200, { success: true, rows: [] },done);
        });

        it('GET /api/theIdOfAnAd -> should return an object with first element of rows with property name === "MacBook"', function(done){
            let adId;
            agent
                .get('/api/ads')
                .expect(function(res){
                    adId = res.body.rows[0]._id;
                })
                .end(function(res){
                    agent
                        .get('/api/ads/' + adId)
                        .expect(function(res){
                            if(res.body.row.name !== 'MacBook'){
                                throw new Error(`Response rows first element not as expected, returned: ${res.body.rows[0].name}`);
                            }
                        })
                    .end(done);
                });
        });

        it('GET /api/ads/1 -> should return { success: false, error: "\'1\' is not a valid id. "}', function(done){
            agent
                .get('/api/ads/1')
                .expect(500, { success: false, error: `'1' is not a valid id. ` },done);
        });

    });

});