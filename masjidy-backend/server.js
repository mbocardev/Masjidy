const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Charger les variables d'environnement

const app = express();
app.use(cors()); // Activer les requêtes CORS
app.use(express.json()); // Middleware pour analyser le corps des requêtes JSON

const PORT = process.env.PORT || 5000;

// Routes de l'application
app.use('/api/prayers', require('./routes/prayerRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/imam', require('./routes/imamRoutes'));

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
