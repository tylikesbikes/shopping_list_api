const { json } = require('express');
const express = require('express');
const {ExpressError} = require('./expressError');
const router = new express.Router();

router.get('/', (req, res, next) => {
    res.send(items);
})

router.post('/', (req, res, next) => {
    try {
        const newItem = req.body;
        if (req.body === {}) {
            throw new ExpressError('Please provide item details', 400)
        }

        items.push(newItem);
        return res.status(201).send({"added":newItem});
    } catch(err) {
        return next(err);
    }
})

router.get('/:name', (req, res, next) => {
    try {
        const requestedItem = items.find(i => i.name === req.params.name);
        if (!requestedItem) {
            throw new ExpressError('Item Not Found ', 400);
        }
        return res.send(requestedItem);
    } catch(err) {
        return next(err);
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        const requestedItem = items.find(i => i.name === req.params.name);

        if (!requestedItem) {
            throw new ExpressError('Item not found', 400);
        }

        requestedItem.name = req.body.name;
        requestedItem.price = req.body.price;

        return res.send({"updated":requestedItem})
    } catch(err) {
        return next(err);
    }
})

router.delete('/:name', (req, res, next) => {
    try {
    const requestedItem = items.findIndex(i => i.name === req.params.name);
    if (requestedItem === -1) {
        throw new ExpressError('Item Not Found', 400)
    }
    items.splice(requestedItem, 1);
    return res.send({"message":"deleted"})
    } catch(err) {
        return next(err);
    }
})

module.exports = router;