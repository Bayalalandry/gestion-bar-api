const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
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
    
    // Verification simple (to improve with real database)
    if (username === 'patron' && password === 'admin123' && role === 'patron') {
      const token = 'jwt_token_placeholder'; // To replace with real JWT
      res.json({ success: true, token, user: { username, role } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Produits routes
app.get('/api/produits', async (req, res) => {
  try {
    // Simulate product data
    const produits = [
      { id: 1, nom: 'Biere', prix: 500, quantite: 50, categorie: 'Boissons' },
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
    // Add product logic
    console.log('Add product:', produit);
    res.json({ success: true, message: 'Product added successfully', produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/produits/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produit = req.body;
    // Update product logic
    console.log('Update product:', id, produit);
    res.json({ success: true, message: 'Product updated successfully', produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/produits/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete product logic
    console.log('Delete product:', id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/produits/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite, raison } = req.body;
    // Update stock logic
    console.log('Update stock:', id, quantite, raison);
    res.json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/produits/:id/reapprovisionner', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite } = req.body;
    // Restock logic
    console.log('Restock product:', id, quantite);
    res.json({ success: true, message: 'Product restocked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Employes routes
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

app.post('/api/employes', async (req, res) => {
  try {
    const employe = req.body;
    // Add employee logic
    console.log('Add employee:', employe);
    res.json({ success: true, message: 'Employee added successfully', employe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/employes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employe = req.body;
    // Update employee logic
    console.log('Update employee:', id, employe);
    res.json({ success: true, message: 'Employee updated successfully', employe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/employes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Delete employee logic
    console.log('Delete employee:', id);
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/employes/:id/password', async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    // Reset password logic
    console.log('Reset password:', id);
    res.json({ success: true, message: 'Password reset successfully' });
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

app.put('/api/ventes/:id/annuler', async (req, res) => {
  try {
    const { id } = req.params;
    const { raison } = req.body;
    // Cancel sale logic
    console.log('Cancel sale:', id, raison);
    res.json({ success: true, message: 'Sale cancelled successfully' });
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
        { nom: 'Biere', quantite: 5, seuilAlerte: 10 },
        { nom: 'Chips', quantite: 8, seuilAlerte: 15 }
      ],
      alerts: [
        { type: 'stock', message: 'Stock bas pour Biere', timestamp: new Date() }
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
    console.log('Sync ventes:', ventes.length, 'ventes at', timestamp);
    res.json({ success: true, message: 'Sales synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/produits', async (req, res) => {
  try {
    const { produits, timestamp } = req.body;
    console.log('Sync produits:', produits.length, 'produits at', timestamp);
    res.json({ success: true, message: 'Products synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/utilisateurs', async (req, res) => {
  try {
    const { utilisateurs, timestamp } = req.body;
    console.log('Sync utilisateurs:', utilisateurs.length, 'utilisateurs at', timestamp);
    res.json({ success: true, message: 'Users synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Alerts routes
app.post('/api/alerts', async (req, res) => {
  try {
    const { type, message, timestamp } = req.body;
    console.log('Alert:', type, message, timestamp);
    res.json({ success: true, message: 'Alert recorded' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log('Server API Gestion Bar started on port ' + PORT);
  console.log('Health check: http://localhost:' + PORT + '/api/health');
});
