'use stric';

const mongoose = require('mongoose');

// Schema definition

const adSchema = mongoose.Schema({
    name: {
        type: String,
        index: true 
    },
    onSell: {
        type: Boolean,
        index: true 
    },
    price: {
        type: Number,
        index: true 
    },
    image: String,
    tags: {
        type: [String],
        index: true 
    }
});


adSchema.statics.list = function(filter, limit){

    const query = Ad.find(filter);
    query.limit(limit);
    return query.exec(); // Execute the query
};

// Create the model

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;