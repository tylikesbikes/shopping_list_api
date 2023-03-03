const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
    res.send(items);
})

router.post('/', (req, res, next) => {
    const new_item = req.body;
    items.push(new_item);
    return res.status(201).send({"added":new_item});
})

router.get('/:name', (req, res, next) => {
    const requestedItem = items.find(i => i.name === req.params.name);
    return res.send(requestedItem);
})

router.patch('/:name', (req, res, next) => {
    const requestedItem = items.find(i => i.name === req.params.name);

    requestedItem.name = req.body.name;
    requestedItem.price = req.body.price;

    return res.send({"updated":requestedItem})
})

router.delete('/:name', (req, res, next) => {
    const requestedItem = items.findIndex(i => i.name === req.params.name);
    items.splice(requestedItem, 1);
    return res.send({"message":"deleted"})
})

module.exports = router;