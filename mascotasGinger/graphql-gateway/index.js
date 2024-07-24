const express = require('express');
const fetch = require('node-fetch');

const REMOTE_GRAPHQL = 'http://mascotas-api:8080/graphql';

const app = express();
app.use(express.json());

// Proxy: reenvía todas las peticiones a la API Java
app.use('/graphql', async (req, res) => {
  try {
    const response = await fetch(REMOTE_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.set('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(502).json({ error: 'Error conectando con el backend GraphQL', details: err.message });
  }
});

app.listen(4000, () => {
  console.log('Express GraphQL Gateway running at http://localhost:4000/graphql');
}); 