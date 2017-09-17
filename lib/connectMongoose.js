'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error connecting to database', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connect('mongodb://localhost/nodepopdb', {useMongoClient: true});
