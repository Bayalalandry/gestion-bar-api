const express = require('express');
const cors = require('cors');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route (must be first)
app.get('/api/health', (req, res) => {
  console.log('Health check accessed');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'API Gestion Bar is running'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Gestion Bar - Remote Management System',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/login',
      produits: '/api/produits',
      employes: '/api/employes',
      ventes: '/api/ventes/recent',
      stats: '/api/stats/realtime'
    }
  });
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log('Login attempt:', { username, role });
    
    if (username === 'patron' && password === 'admin123' && role === 'patron') {
      res.json({ 
        success: true, 
        token: 'jwt_token_placeholder_' + Date.now(),
        user: { username, role } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Produits routes
app.get('/api/produits', (req, res) => {
  try {
    const produits = [
      { id: 1, nom: 'Biere', prix: 500, quantite: 50, categorie: 'Boissons' },
      { id: 2, nom: 'Coca-Cola', prix: 300, quantite: 100, categorie: 'Boissons' },
      { id: 3, nom: 'Chips', prix: 200, quantite: 30, categorie: 'Snacks' },
      { id: 4, nom: 'Vin Rouge', prix: 1500, quantite: 25, categorie: 'Boissons' },
      { id: 5, nom: 'Soda', prix: 250, quantite: 80, categorie: 'Boissons' }
    ];
    console.log('Produits requested:', produits.length, 'items');
    res.json({ success: true, produits });
  } catch (error) {
    console.error('Produits error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/produits', (req, res) => {
  try {
    const produit = req.body;
    console.log('Add product:', produit);
    res.json({ success: true, message: 'Product added successfully', produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/produits/:id', (req, res) => {
  try {
    const { id } = req.params;
    const produit = req.body;
    console.log('Update product:', id, produit);
    res.json({ success: true, message: 'Product updated successfully', produit });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/produits/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete product:', id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/produits/:id/stock', (req, res) => {
  try {
    const { id } = req.params;
    const { quantite, raison } = req.body;
    console.log('Update stock:', id, quantite, raison);
    res.json({ success: true, message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/produits/:id/reapprovisionner', (req, res) => {
  try {
    const { id } = req.params;
    const { quantite } = req.body;
    console.log('Restock product:', id, quantite);
    res.json({ success: true, message: 'Product restocked successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Employes routes
app.get('/api/employes', (req, res) => {
  try {
    const employes = [
      { id: 1, nom: 'Jean Dupont', nomUtilisateur: 'jean', role: 'employe' },
      { id: 2, nom: 'Marie Curie', nomUtilisateur: 'marie', role: 'manager' },
      { id: 3, nom: 'Pierre Martin', nomUtilisateur: 'pierre', role: 'employe' }
    ];
    console.log('Employes requested:', employes.length, 'items');
    res.json({ success: true, employes });
  } catch (error) {
    console.error('Employes error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/employes', (req, res) => {
  try {
    const employe = req.body;
    console.log('Add employee:', employe);
    res.json({ success: true, message: 'Employee added successfully', employe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/employes/:id', (req, res) => {
  try {
    const { id } = req.params;
    const employe = req.body;
    console.log('Update employee:', id, employe);
    res.json({ success: true, message: 'Employee updated successfully', employe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/employes/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete employee:', id);
    res.json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/employes/:id/password', (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    console.log('Reset password:', id);
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ventes routes
app.get('/api/ventes/recent', (req, res) => {
  try {
    const ventes = [
      { id: 1, clientNom: 'Client A', total: 1500, quantite: 3, dateVente: new Date() },
      { id: 2, clientNom: 'Client B', total: 800, quantite: 2, dateVente: new Date() },
      { id: 3, clientNom: 'Client C', total: 2300, quantite: 5, dateVente: new Date() }
    ];
    console.log('Recent ventes requested:', ventes.length, 'items');
    res.json({ success: true, ventes });
  } catch (error) {
    console.error('Ventes error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/ventes/:id/annuler', (req, res) => {
  try {
    const { id } = req.params;
    const { raison } = req.body;
    console.log('Cancel sale:', id, raison);
    res.json({ success: true, message: 'Sale cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Stats routes
app.get('/api/stats/realtime', (req, res) => {
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
    console.log('Realtime stats requested');
    res.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Sync routes
app.post('/api/sync/ventes', (req, res) => {
  try {
    const { ventes, timestamp } = req.body;
    console.log('Sync ventes:', ventes?.length || 0, 'ventes');
    res.json({ success: true, message: 'Sales synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/produits', (req, res) => {
  try {
    const { produits, timestamp } = req.body;
    console.log('Sync produits:', produits?.length || 0, 'produits');
    res.json({ success: true, message: 'Products synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/sync/utilisateurs', (req, res) => {
  try {
    const { utilisateurs, timestamp } = req.body;
    console.log('Sync utilisateurs:', utilisateurs?.length || 0, 'utilisateurs');
    res.json({ success: true, message: 'Users synchronized' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Alerts routes
app.post('/api/alerts', (req, res) => {
  try {
    const { type, message, timestamp } = req.body;
    console.log('Alert:', type, message);
    res.json({ success: true, message: 'Alert recorded' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Server error' });
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ success: false, message: 'Route not found', path: req.path });
});

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 API Gestion Bar started successfully!');
  console.log('📍 Port:', PORT);
  console.log('🏥 Health check:', `http://localhost:${PORT}/api/health`);
  console.log('🌐 Environment:', process.env.NODE_ENV || 'development');
  console.log('='.repeat(50));
});
