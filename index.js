const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const wrap = require('./wrap');
const CustomError = require('./error');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Server started successfully @ ${PORT}`);
});
