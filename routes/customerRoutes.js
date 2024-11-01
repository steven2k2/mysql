// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to render the customer list page
router.get('/', customerController.getAllCustomers);

module.exports = router;
