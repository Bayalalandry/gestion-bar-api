const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gestion-bar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    
    // Vérification simple (à améliorer avec vraie base de données)
    if (username === 'patron' && password === 'admin123' && role === 'patron') {
      const token = 'jwt_token_placeholder'; // À remplacer avec vrai JWT
      res.json({ success: true, token, user: { username, role } });
    } else {
      res.status(401).json({ success: false, message: 'Identifiants invalides' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Produits routes
app.get('/api/produits', async (req, res) => {
  try {
    // Simuler des données produits
    const produits = [
      { id: 1, nom: 'Bière', prix: 500, quantite: 50, categorie: 'Boissons' },
      { id: 2, nom: 'Coca-Cola', prix: 300, quantite: 100, categorie: 'Boissons' },
      { id: 3, nom: 'Chips', prix: 200, quantite: 30, categorie: 'Snacks' }
    ];
    res.json({ success: true, produits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/produits', async (req, res) => {
  try {
    const produit = req.body;
    // Logique d'ajout de produit
    console.log('Ajout produit:', produit);
    res.json({ success: true, message: 'Produit ajouté avec succès', produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Employés routes
app.get('/api/employes', async (req, res) => {
  try {
    const employes = [
      { id: 1, nom: 'Jean Dupont', nomUtilisateur: 'jean', role: 'employe' },
      { id: 2, nom: 'Marie Curie', nomUtilisateur: 'marie', role: 'manager' }
    ];
    res.json({ success: true, employes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ventes routes
app.get('/api/ventes/recent', async (req, res) => {
  try {
    const ventes = [
      { id: 1, clientNom: 'Client A', total: 1500, quantite: 3, dateVente: new Date() },
      { id: 2, clientNom: 'Client B', total: 800, quantite: 2, dateVente: new Date() }
    ];
    res.json({ success: true, ventes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Stats routes
app.get('/api/stats/realtime', async (req, res) => {
  try {
    const stats = {
      chiffreAffaires: 150000,
      ventesJour: 45,
      clientsConnectes: 12,
      produitsActifs: 25,
      stockAlerts: [
        { nom: 'Bière', quantite: 5, seuilAlerte: 10 },
        { nom: 'Chips', quantite: 8, seuilAlerte: 15 }
      ],
      alerts: [
        { type: 'stock', message: 'Stock bas pour Bière', timestamp: new Date() }
      ]
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sync routes
app.post('/api/sync/ventes', async (req, res) => {
  try {
    const { ventes, timestamp } = req.body;
    console.log('Sync ventes:', ventes.length, 'ventes à', timestamp);
    res.json({ success: true, message: 'Ventes synchronisées' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/produits', async (req, res) => {
  try {
    const { produits, timestamp } = req.body;
    console.log('Sync produits:', produits.length, 'produits à', timestamp);
    res.json({ success: true, message: 'Produits synchronisés' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/utilisateurs', async (req, res) => {
  try {
    const { utilisateurs, timestamp } = req.body;
    console.log('Sync utilisateurs:', utilisateurs.length, 'utilisateurs à', timestamp);
    res.json({ success: true, message: 'Utilisateurs synchronisés' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Alerts routes
app.post('/api/alerts', async (req, res) => {
  try {
    const { type, message, timestamp } = req.body;
    console.log('Alert:', type, message, timestamp);
    res.json({ success: true, message: 'Alerte enregistrée' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur serveur' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

app.listen(PORT, () => {
  console.log(?? Serveur API Gestion Bar démarré sur le port );
  console.log(?? Health check: http://localhost:/api/health);
});
