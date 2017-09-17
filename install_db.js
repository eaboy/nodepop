'use strict';

const client = require('mongodb').MongoClient;
const fs = require('fs');

var readJson = function() {
    return new Promise((resolve, reject) => {
        fs.readFile('ads.json', 'utf8', (err, data) => {
            if(err) {
                reject(err);
            } else {
                const jsonAds = JSON.parse(data);
                resolve (jsonAds);
            }
        });
    });
};

client.connect('mongodb://localhost/nodepopdb')
    .then( db => {
        return db.dropDatabase()
        .then(readJson)
        .then(data => {
            return db.collection('ads').insertMany(data.ads)
            .then( () => {
                return db.collection('tags').insertMany(data.tags);
            });
        });
    })
    .catch(err => {
        console.log('Error', err);
    });