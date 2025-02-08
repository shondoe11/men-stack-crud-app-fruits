const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const fruitSchema = new Schema({
    name: String,
    isReadyToEat: Boolean,
});

const Fruit = model('Fruit', fruitSchema);

module.exports = Fruit;