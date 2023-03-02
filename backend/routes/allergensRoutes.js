const express = require('express');
const router = express.Router();
const fs = require('fs');
const allergensController = require('../controllers/allergensController');

router.get('/', allergensController.sendAllergenJsonToRoute);

module.exports = router;
