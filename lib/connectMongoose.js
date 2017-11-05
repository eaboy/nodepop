'use strict';

const mongoose = require('mongoose');
const fs = require('fs');

const conn = mongoose.connection;

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

conn.on('error', err => {
	console.log('Error connecting to database', err);
	process.exit(1);
});

conn.once('open', () => {
	console.log('Connected to MongoDB', mongoose.connection.name);
});

readConfig()
	.then(data => {
		mongoose.connect(data.mongoose_connection, {useMongoClient: true});
	})
	.catch(err => {
		console.log('Error', err);
	});
