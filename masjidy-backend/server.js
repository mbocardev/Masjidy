const express = require('express');
const mongoose = require('mongoose');
const prayerRoutes = require('./routes/prayerRoutes');

const app = express();
app.use(express.json());

// Définir le chemin de base pour les routes de prières
app.use('/api/prayer', prayerRoutes);

// Lancement du serveur
const PORT = 5000;
mongoose
  .connect('mongodb://127.0.0.1:27017/masjidy')
  .then(() => {
    console.log('Connexion à MongoDB réussie');
    app.listen(PORT, () => console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`));
  })
  .catch((error) => console.log('Erreur de connexion à MongoDB :', error));