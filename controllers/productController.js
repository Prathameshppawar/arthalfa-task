const Product = require('../models/product');
const { Sequelize } = require('sequelize');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    // Validate required fields
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name is required and must be a string.' });
    }
    if (price == null || typeof price !== 'number') {
      return res.status(400).json({ error: 'Price is required and must be a number.' });
    }
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Category is required and must be a string.' });
    }

    const newProduct = await Product.create({ name, price, description, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Get all products with optional pagination
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  // Validate pagination parameters
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  if (pageNum < 1 || limitNum < 1) {
    return res.status(400).json({ error: 'Page and limit must be positive integers.' });
  }

  try {
    const products = await Product.findAll({
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Search for products by ID or name
exports.searchProducts = async (req, res) => {
  const { query } = req.params;

  const whereClause = {
    [Sequelize.Op.or]: [
      { id: query },
      { name: { [Sequelize.Op.like]: `%${query}%` } }
    ]
  };

  try {
    const products = await Product.findAll({ where: whereClause });
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get all products sorted by price
exports.getProductsSortedByPrice = async (req, res) => {
  const { order = 'asc' } = req.query;

  if (order !== 'asc' && order !== 'desc') {
    return res.status(400).json({ error: 'Order must be either "asc" or "desc".' });
  }

  try {
    const products = await Product.findAll({
      order: [['price', order === 'asc' ? 'ASC' : 'DESC']]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  const id = parseInt(req.params.id); // Ensure ID is an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  const id = parseInt(req.params.id); // Ensure ID is an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  try {
    const { name, price, description, category } = req.body;
    
    // Validate required fields
    if (name && typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string.' });
    }
    if (price != null && typeof price !== 'number') {
      return res.status(400).json({ error: 'Price must be a number.' });
    }
    if (category && typeof category !== 'string') {
      return res.status(400).json({ error: 'Category must be a string.' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update({ name, price, description, category });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id); // Ensure ID is an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID.' });
  }

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
