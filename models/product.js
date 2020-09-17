const mongoose = require('mongoose');

const Product =  new mongoose.Schema({
    name: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    description: {
        type: String,
    },
    images: {
        type: String,
        get: val => {
            return val.split('|');
        },
        set: val => {
            return val.join('|');
        }
    },
    price: {
        type: Number,
        default: 0.0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    tags: [ String ]
}, {
    toJSON: {
        getters: true
    }
});

module.exports = mongoose.model('Product', Product);