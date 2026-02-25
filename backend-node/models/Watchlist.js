const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  currency: {
    type: String,
    required: false
  },
  unit: {
    type: String,
    required: false
  },
  // On peut aussi stocker l'image ou d'autres infos si besoin
}, { timestamps: true });

// Unicité par utilisateur, produit ET source (pour éviter les doublons d'offre)
WatchlistSchema.index({ user: 1, productName: 1, source: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', WatchlistSchema);