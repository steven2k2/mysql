// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();

// Route to render the static dashboard page
router.get('/', (req, res) => {
    res.render('portal'); // Render the portal.ejs view
});

module.exports = router;