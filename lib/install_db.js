'use strict';

const client = require('mongodb').MongoClient;
const fs = require('fs');
const User = require('../models/User');

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

var readConfig = function() {
	return new Promise((resolve, reject) => {
		fs.readFile('local_config.json', 'utf8', (err, data) => {
			if(err) {
				reject(err);
			} else {
				const jsonConfig = JSON.parse(data);
				resolve(jsonConfig);
			}
		});
	});
};

readConfig()
	.then(data => {
		client.connect(data.mongoose_connection)
			.then( db => {
				return db.dropDatabase()
				.then(readJson)
				.then(data => {
					return db.collection('ads').insertMany(data.ads)
					.then( () => {
						return db.collection('tags').insertMany(data.tags)
						.then( () => {
							data.users[0].password = User.hashPassword(data.users[0].password);
							return db.collection('users').insertMany(data.users);
						});
					});
				});
			})
			.then(() => {
				console.log('Database initialized correctly');
				process.exit();
			})
			.catch(err => {
				console.log('Error', err);
			});
	})
	.catch(err => {
		console.log('Error', err);
	});
	