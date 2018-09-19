const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', {
    pageTitle: 'Contact',
  });
});

module.exports = router;
