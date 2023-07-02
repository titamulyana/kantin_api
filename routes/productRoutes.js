'use strict';
const express = require('express');
const productControllers = require('../controllers/productControllers.js');
const router = express.Router();
const authn = require('../middleware/authn');

router.use(authn);
router.get('/', productControllers.getAllProduct);
router.get('/:id', productControllers.getById);
router.put('/update/:id', productControllers.update);
router.delete('/delete/:id', productControllers.deleteProduct);
router.post('/create', productControllers.createProduct);

module.exports = router;
