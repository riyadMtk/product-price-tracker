const Watchlist = require('../models/Watchlist');

// Ajouter un produit avec détails
exports.add = async (req, res) => {
  try {
    const { productName, source, price, currency, unit } = req.body;
    const userId = req.userId;

    const watchlistItem = new Watchlist({
      user: userId,
      productName,
      source,
      price,
      currency,
      unit
    });
    await watchlistItem.save();

    res.status(201).json(watchlistItem);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Cette offre est déjà dans votre watchlist' });
    }
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les éléments
exports.getAll = async (req, res) => {
  try {
    const userId = req.userId;
    const watchlist = await Watchlist.find({ user: userId }).sort({ createdAt: -1 });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un élément par ID
exports.getById = async (req, res) => {
  try {
    const userId = req.userId;
    const item = await Watchlist.findOne({ _id: req.params.id, user: userId });
    if (!item) {
      return res.status(404).json({ message: 'Élément non trouvé' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un élément (inchangé)
exports.remove = async (req, res) => {
  try {
    const { productName } = req.params; // ou utiliser l'ID si on préfère
    const userId = req.userId;
    const result = await Watchlist.findOneAndDelete({ user: userId, productName });
    if (!result) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeById = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await Watchlist.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!result) {
      return res.status(404).json({ message: 'Élément non trouvé' });
    }
    res.json({ message: 'Élément supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};