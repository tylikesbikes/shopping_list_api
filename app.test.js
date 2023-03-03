process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('./app');
const express = require('express');
const items = require('./fakeDb');

let item = {name:'bike', price:5000};

beforeEach(async() => { 
    items.push(item);

});

afterEach(async () => {
    items.length = 0;
});

test('show a list of items', async function() {
    const res = await request(app).get('/items');
    const itemList = res.body;
    expect(itemList).toHaveLength(1);
    expect(itemList[0].name).toEqual('bike');
});

test('add a new item', async function() {
    const newItem = {name:'hammer', price:15.99};
    const res = await request(app).post('/items')
        .send({name:'hammer', price:15.99});
    
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual({'added':newItem});
});


test('view specific item', async () => {
    const res = await request(app).get('/items/bike');

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('bike');
});

test('update specific item', async() => {
    const res = await request(app).patch('/items/bike')
        .send({name:'BIKE', price:10000});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({updated:{name:'BIKE', price:10000}});
});


test('delete item', async () => {
    expect(items).toHaveLength(1);
    expect(items[0].name).toEqual('BIKE');
    const res = await request(app).delete('/items/BIKE');
    expect(res.body).toEqual({"message":"deleted"})
    expect(items).toHaveLength(0);
})

test('delete non-existend item', async () => {
    
    const res = await(request(app).delete('/items/steak'))

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({"error":"Item Not Found"});
});