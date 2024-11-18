const axios = require('axios');

// Récupérer les horaires de prière pour une ville donnée
const getPrayerTimesByCity = async (req, res) => {
  const { city, country } = req.query;

  if (!city || !country) {
    return res.status(400).json({ message: 'La ville et le pays sont obligatoires.' });
  }

  try {
    const response = await axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`);
    const prayerTimes = response.data.data.timings;

    res.status(200).json({
      city,
      country,
      timings: prayerTimes,
      date: response.data.data.date.readable,
      timezone: response.data.data.meta.timezone,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des horaires de prière.' });
  }
};

module.exports = {
  getPrayerTimesByCity,
};
