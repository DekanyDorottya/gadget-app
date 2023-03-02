const express = require('express');
const router = express.Router();
const fs = require('fs');
const pizzaController = require('../controllers/pizzasController');

router.get('/', pizzaController.sendPizzaJsonToRoute); // +id?
router.get('/list', pizzaController.sendFileIndexHtml);

//ide jönne még több http method ha lenne

module.exports = router;
