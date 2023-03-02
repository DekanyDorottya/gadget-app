const express = require('express');
const router = express.Router();
const fs = require('fs');
const ordersController = require('../controllers/ordersController')



router.route('/').get(ordersController.sendOrdersJsonToRoute).post(ordersController.writeNewOrdersToOrderJson);

module.exports = router;
