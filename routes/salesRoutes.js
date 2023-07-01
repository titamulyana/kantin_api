'use strict';
const express = require('express');
const salesControllers = require('../controllers/salesControllers.js');
const router = express.Router();
const authn = require('../middleware/authn');

router.use(authn);

router.post('/salesid/', salesControllers.getBySalesId);
router.get('/laporan/:type', salesControllers.laporan);
router.get('/', salesControllers.getAllSales);
router.get('/id/:id', salesControllers.getSalesById);
router.post('/create', salesControllers.createSales);
router.put('/update/:id', salesControllers.updateSales);
router.put('/payment/', salesControllers.updateStatus);
router.delete('/delid/:id', salesControllers.delId);
router.delete('/delsal/:salesId', salesControllers.delSalesid);
router.post('/salID/:table', salesControllers.getSalesId);

module.exports = router;
