const express = require('express');

const router = express.Router();
const fs = require('fs');
const { promisify } = require('util');

router.get('/', async (req, res) => {
  const readFile = promisify(fs.readFile);
  const services = await readFile('json/services.json', 'utf8');

  if (services) {
    res.render('services', {
      pageTitle: 'Services',
      services: JSON.parse(services),
    });
  }
});

module.exports = router;
