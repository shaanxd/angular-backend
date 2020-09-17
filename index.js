require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const wrap = require('./util/wrap');
const CustomError = require('./exception/error');

const productRoutes = require('./routes/product');

const PORT = process.env.PORT || 8080;
const {DB_NAME, DB_PORT, DB_HOST} = process.env;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/products', productRoutes);

app.post('/api/v1/auth/login-user', wrap(async (req, res, next) => {
    const {body: {username, password}} = req;

    if (!username || !password) {
        throw new CustomError(401, "Username or Password not provided.");
    }
    if (username == "shahid" && password == "root") {
        return res.status(200).json({
            token: "insert-sample-token-here",
            expiresIn: 123456,
        });
    }
    throw new CustomError(400, "Username or Password invalid. Please try again with valid credentials.");
}));

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error. Please try again',
    });
});

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true}).
    then(() => {
        console.log(`Connection to database @ ${DB_HOST} successfull. Starting server now.`);
        app.listen(PORT, () => {
            console.log(`Server started successfully @ ${PORT}`);
        })
    })
    .catch(err => {
        console.log(`Error occurred while connecting to database. ${err.message}`);
    })
