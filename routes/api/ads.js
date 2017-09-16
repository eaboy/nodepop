'use strict';

const express = require('express');
const router = express.Router();

// Require the model

const Ad = require('../../models/Ad');


// GET /
router.get('/', (req, res, next) => {

    const name = req.query.name;
    const tag = req.query.tag;
    const limit = parseInt(req.query.limit);

    const filter = {};

    if(name) {
        filter.name = name;
    }
    
    if(tag) {
        filter.tag = tag;
    }

    // recupera una lista de agentes

    Ad.list(filter, limit).then(list => { 
        res.json({ success: true, rows: list});
    }).catch( err => {
        console.log('Error', err);
        next(err); 
        return;
    });
    
});

// GET /:id
// Get an ad by id from db and returns it

router.get('/:id', (req, res, next) => {

    const _id = req.params.id;

    Ad.findOne({ _id: _id }, (err, ad) => {
        if(err){
            console.log('Error', err);
            next(err);
            return;
        }

        res.json({ success: true, row: ad});
    });

});

// POST /
// Saves an ad to db

router.post('/', (req, res, next) => {
    console.log(req.body);
    const ad = new Ad(req.body);
    ad.save((err, savedAd) => {
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: savedAd});
    });
});

// PUT /
// Udates an ad

router.put('/:id', (req, res, next) => {
    console.log(req.body);
    
    const _id = req.params.id;
    Ad.findOneAndUpdate({_id: _id}, req.body, {new:true}, (err, updatedAd) => { 
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: updatedAd});
    });
});

// DELETE /
// Deletes an ad

router.delete('/:id', (req, res, next) => {
    console.log(req.body);
    
    const _id = req.params.id;
    Ad.remove({_id: _id}, (err) => { 
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true });
    });
});

module.exports = router;