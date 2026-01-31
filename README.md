# API REST Gestion Bar

## Installation
1. npm install
2. npm start
3. Server: http://localhost:3000

## Test
curl http://localhost:3000/api/health

## Endpoints
- GET /api/health
- POST /api/auth/login
- GET /api/produits
- GET /api/employes
- GET /api/ventes/recent
- GET /api/stats/realtime

## Deploy
Heroku: git push heroku main
VPS: pm2 start server.js
