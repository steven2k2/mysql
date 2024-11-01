// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const meterController = require('../controllers/meterController');

// Route to render the customer list page
router.get('/', meterController.getAllMeters);

module.exports = router;
