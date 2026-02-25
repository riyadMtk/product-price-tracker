const express = require('express');
const auth = require('../middleware/auth');
const { search } = require('../controllers/priceController');
const router = express.Router();

// On peut laisser public ou protéger selon le besoin. Ici on laisse public.
router.get('/search', search);

module.exports = router;