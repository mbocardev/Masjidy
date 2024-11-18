const express = require('express');
const { getPrayerTimesByCity } = require('../controllers/prayerController');
const router = express.Router();

// Route pour obtenir les horaires de prière
router.get('/timings', getPrayerTimesByCity);

module.exports = router;
