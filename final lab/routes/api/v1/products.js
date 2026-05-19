const express = require('express');
const Product = require('../../../models/Product');

const router = express.Router();

const LIMIT = 8;
const CATEGORIES = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'];
const SORT_OPTIONS = {
  'name-asc': { name: 1 },
  'name-desc': { name: -1 },
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  'rating-desc': { rating: -1 }
};

router.get('/', async (req, res) => {
  try {
    const {
      search = '',
      category = '',
      minPrice = '',
      maxPrice = '',
      sort = 'name-asc',
      page = '1'
    } = req.query;

    const currentPage = Math.max(1, parseInt(page) || 1);
    const filter = {};

    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category && CATEGORIES.includes(category)) filter.category = category;
    if (minPrice !== '' || maxPrice !== '') {
      filter.price = {};
      if (minPrice !== '') filter.price.$gte = parseFloat(minPrice);
      if (maxPrice !== '') filter.price.$lte = parseFloat(maxPrice);
    }

    const sortObj = SORT_OPTIONS[sort] || SORT_OPTIONS['name-asc'];
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / LIMIT) || 1;
    const skip = (currentPage - 1) * LIMIT;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(LIMIT);

    return res.json({
      products,
      pagination: { total, totalPages, currentPage, limit: LIMIT }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    return res.json(product);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
