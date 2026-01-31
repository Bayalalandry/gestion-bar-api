const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'API Gestion Bar is working', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/produits', (req, res) => {
  res.json({
    success: true,
    produits: [
      { id: 1, nom: 'Biere', prix: 500, quantite: 50, categorie: 'Boissons' },
      { id: 2, nom: 'Coca-Cola', prix: 300, quantite: 100, categorie: 'Boissons' }
    ]
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'patron' && password === 'admin123') {
    res.json({
      success: true,
      token: 'jwt_token_placeholder',
      user: { username, role: 'patron' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/employes', (req, res) => {
  res.json({
    success: true,
    employes: [
      { id: 1, nom: 'Jean Dupont', nomUtilisateur: 'jean', role: 'employe' }
    ]
  });
});

app.get('/api/ventes/recent', (req, res) => {
  res.json({
    success: true,
    ventes: [
      { id: 1, clientNom: 'Client A', total: 1500, quantite: 3, dateVente: new Date() }
    ]
  });
});

app.get('/api/stats/realtime', (req, res) => {
  res.json({
    chiffreAffaires: 150000,
    ventesJour: 45,
    clientsConnectes: 12,
    produitsActifs: 25
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
