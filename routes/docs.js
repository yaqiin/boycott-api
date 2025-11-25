const express = require('express');
const swaggerSpec = require('../config/swagger');
const { getSwaggerUiHtml } = require('../utils/swaggerUi');

const router = express.Router();

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.get('/', (req, res) => {
  res.send(getSwaggerUiHtml());
});

module.exports = router;

