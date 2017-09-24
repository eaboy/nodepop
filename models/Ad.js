'use strict';

const mongoose = require('mongoose');

// Schema definition

const adSchema = mongoose.Schema({
	name: {
		type: String,
		index: true ,
		required: true
	},
	onSale: {
		type: Boolean,
		index: true,
		required: true
	},
	price: {
		type: Number,
		index: true,
		required: true
	},
	image: {
		type: String
	},
	tags: [{
		type: String,
		enum: ['work', 'lifestyle', 'motor', 'mobile'],
		index: true
	}]
});


adSchema.statics.list = function(filter, limit){
	const query = Ad.find(filter);
	query.limit(limit);
	return query.exec(); // Execute the query
};

// Create the model

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;