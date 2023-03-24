const express = require('express');
const router = express.Router();
const Faq = require('../models/faq.model');

// Récupérer les faqs
router.get('/faq', async (req, res) => {
  try {
    const faq = await Faq.find();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
