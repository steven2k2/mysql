// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

// Route to render the static dashboard page
router.get('/', (req, res) => {
    res.render('dashboard',{ activePath: 'dashboard',first_name: req.session.first_name || 'Guest' }); // Render the dashboard.ejs view
});

module.exports = router;