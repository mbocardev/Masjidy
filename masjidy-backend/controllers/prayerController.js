const axios = require('axios');
const PrayerTiming = require('../models/PrayerTiming');

// Fonction pour récupérer les horaires de prière
const getPrayerTimings = async (req, res) => {
  const { city, country } = req.query;

  console.log(`City: ${city}, Country: ${country}`); // Log pour déboguer

  if (!city || !country) {
    return res.status(400).json({ message: 'La ville et le pays sont obligatoires.' });
  }

  try {
    // Date du jour
    const date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Vérifier si les horaires existent dans la BD pour cette ville et pays
    let timings = await PrayerTiming.findOne({ city, country, date });

    if (!timings) {
      // Si aucun horaire trouvé, récupérer via l'API
      const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: { city, country },
      });

      const apiTimings = response.data.data.timings;

      // Sauvegarder dans la base de données
      timings = new PrayerTiming({
        city,
        country,
        date,
        fajr: apiTimings.Fajr,
        dhuhr: apiTimings.Dhuhr,
        asr: apiTimings.Asr,
        maghrib: apiTimings.Maghrib,
        isha: apiTimings.Isha,
      });

      await timings.save();
    } else {
      // Si les horaires existent, vérifier si les horaires sont différents de ceux de l'API
      const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: { city, country },
      });

      const apiTimings = response.data.data.timings;

      // Vérification si les horaires ont changé
      if (
        timings.fajr !== apiTimings.Fajr ||
        timings.dhuhr !== apiTimings.Dhuhr ||
        timings.asr !== apiTimings.Asr ||
        timings.maghrib !== apiTimings.Maghrib ||
        timings.isha !== apiTimings.Isha
      ) {
        // Si les horaires sont différents, mettre à jour la base de données
        timings.fajr = apiTimings.Fajr;
        timings.dhuhr = apiTimings.Dhuhr;
        timings.asr = apiTimings.Asr;
        timings.maghrib = apiTimings.Maghrib;
        timings.isha = apiTimings.Isha;

        await timings.save(); // Sauvegarder les nouveaux horaires
      }
    }

    res.status(200).json(timings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des horaires de prière.' });
  }
};

module.exports = { getPrayerTimings };
