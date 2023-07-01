'use strict';
const express = require('express');
const userConttrollers = require('../controllers/userConttrollers.js');
const router = express.Router();

router.post('/register', userConttrollers.register);
router.post('/login', userConttrollers.login);
router.put('/change/:userId', userConttrollers.changePassword);

module.exports = router;
