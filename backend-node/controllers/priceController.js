const axios = require('axios');

exports.search = async (req, res) => {
  try {
    const { product } = req.query;
    if (!product) {
      return res.status(400).json({ message: 'Le paramètre "product" est requis' });
    }

    // Appel au service Python
    const pythonUrl = `${process.env.PYTHON_SERVICE_URL}/prices?product=${encodeURIComponent(product)}`;
    const response = await axios.get(pythonUrl);

    res.json(response.data);
  } catch (err) {
    console.error('Erreur lors de l\'appel au service Python:', err.message);
    res.status(500).json({ message: 'Erreur lors de la récupération des prix' });
  }
};