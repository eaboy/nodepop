'use strict';

const express = require('express');
const router = express.Router();

// Require the model

const Tag = require('../../models/Tag');


// GET /
router.get('/', (req, res, next) => {

	const name = req.query.name;
    
	const filter = {};

	if(name) {
		filter.name = new RegExp('^' + name, 'i');
	}

	// recupera una lista de agentes

	Tag.list(filter).then(list => { 
		res.json({ success: true, rows: list});
	}).catch( err => {
		console.log('Error', err);
		next(err); 
		return;
	});
    
});

module.exports = router;