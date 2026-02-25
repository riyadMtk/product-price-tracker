const express = require('express');
const auth = require('../middleware/auth');
const { add, remove, getAll, getById, removeById } = require('../controllers/watchlistController');
const router = express.Router();

router.use(auth);

// Routes spécifiques d'abord
router.get('/', getAll);                // GET /api/watchlist
router.get('/:id', getById);            // GET /api/watchlist/:id (pour récupérer un élément)
router.delete('/:id', removeById);      // DELETE /api/watchlist/:id (suppression par ID)
router.post('/', add);                  // POST /api/watchlist (ajout)

// Route pour suppression par nom (si vous voulez la conserver)
router.delete('/name/:productName', remove);  // DELETE /api/watchlist/name/:productName

module.exports = router;