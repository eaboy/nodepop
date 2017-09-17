'use strict';

const mongoose = require('mongoose');

// Schema definition

const tagSchema = mongoose.Schema({
    name: {
        type: String,
        index: true 
    }
});


tagSchema.statics.list = function(filter, limit){
    const query = Tag.find(filter);
    return query.exec(); // Execute the query
};

// Create the model

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;