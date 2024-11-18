const mongoose = require('mongoose');

const prayerTimingSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  fajr: { type: String, required: true },
  dhuhr: { type: String, required: true },
  asr: { type: String, required: true },
  maghrib: { type: String, required: true },
  isha: { type: String, required: true },
});

module.exports = mongoose.model('PrayerTiming', prayerTimingSchema);
