'use strict';

const mongoose = require('mongoose');
const Ad = require('../models/Ad');
const Tag = require('../models/Tag');
const User = require('../models/User');

module.exports.initAds = async function(){
    await Ad.deleteMany();
    await Ad.insertMany([
        {
            name : 'MacBook',
            onSale : true,
            price : 750,
            image : 'macbook.jpg',
            tags : [ 
                'work', 
                'lifestyle'
            ]
        }
    ]);
};

module.exports.initTags = async function(){
    await Tag.deleteMany();
    await Tag.insertMany([
        {
            name : 'work'
        }
    ]);
};

module.exports.initUsers = async function(){
    await User.deleteMany();
    await User.insertMany([
        {
            email : 'user@example.com',
            password: User.hashPassword('1234')
        }
    ]);
};