const express = require('express');
const { getPrayerTimings } = require('../controllers/prayerController');

const router = express.Router();

// Route pour récupérer les horaires de prière
router.get('/timings', getPrayerTimings);

module.exports = router;
