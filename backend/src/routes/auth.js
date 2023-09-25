const {register, login} = require('../controllers/auth')

const route = require('express').Router();

route.post('/register',register);
route.post('/login',login);

module.exports = route