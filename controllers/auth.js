const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const CustomError = require('../exception/error');

const { JWT_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const {
        body: {username, password}
    } = req;
    if (!username || !password) {
        throw new CustomError(400, 'Please provide a valid username and password.');
    }
    const foundUser = await User.findOne({username});

    if (!foundUser) {
        throw new CustomError(404, "User not found.");
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
        throw new CustomError(400, "Invalid password. Please provide with a valid password.");
    }
    const token = jwt.sign({ id: foundUser.id }, JWT_KEY , { expiresIn: '1d' });

    res.status(200).json({
        token,
        expiresIn: 360
    });
}

const register = async (req, res, next) => {
    const {
        body: {username, password, firstname, lastname, email}
    } = req;

    if (!email || !password || !firstname || !lastname || !username) {
        throw new CustomError(400, "Please provide valid information");
    }
    const foundUserWithEmail = await User.findOne({ email });
    if (foundUserWithEmail) {
        throw new CustomError(400, "User with given email exists already.");
    }
    const foundUserWithUsername = await User.findOne({ username });
    if (foundUserWithUsername) {
        throw new CustomError(400, "User with given username exists already.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        firstname,
        lastname,
        password: hashedPassword
    })

    const token = jwt.sign({ id: user.id }, JWT_KEY , { expiresIn: '1d' });;

    res.status(200).json({
        token,
        expiresIn: 360
    })
}

module.exports = {
    authenticate,
    register
};