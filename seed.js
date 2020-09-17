require('dotenv').config();
const mongoose = require('mongoose');

const { Product } = require('./models');
const { products } = require('./data');


const {DB_NAME, DB_PORT, DB_HOST} = process.env;

const seedProducts = async () => {
    const result = await Product.insertMany(products);
}

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}).
    then(async() => {
        console.log(`Connection to database @ ${DB_HOST} successfull. Seeding data now.`);
        await seedProducts();
        console.log('Seeding products successful.');
        return;
    })
    .catch(err => {
        console.log(`Error occurred while connecting to database. ${err.message}`);
    })