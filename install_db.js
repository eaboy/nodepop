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
                resolve (jsonAds.ads);
            }
        });
    });
};

client.connect('mongodb://localhost/nodepopdb', (err, db) => {
    if (err){
        console.log('Connection lo MongoDB falied', err);
    }
    db.dropDatabase()
        .then(readJson)
        .then(data => {
            return db.collection('ads').insertMany(data);
        })
        .then()
        .catch(err => {
            console.log('Error', err);
        });
});