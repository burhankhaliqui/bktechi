const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { isLoggedIn } = require('../middlewares/auth');

const LIMIT = 8;
const CATEGORIES = ['iPhone', 'Mac', 'iPad', 'Apple Watch', 'AirPods', 'Accessories'];

const SORT_OPTIONS = {
  'name-asc':   { name: 1 },
  'name-desc':  { name: -1 },
  'price-asc':  { price: 1 },
  'price-desc': { price: -1 },
  'rating-desc':{ rating: -1 },
};

router.get('/products', isLoggedIn, async (req, res) => {
  try {
    const {
      search   = '',
      category = '',
      minPrice = '',
      maxPrice = '',
      sort     = 'name-asc',
      page     = '1'
    } = req.query;

    const currentPage = Math.max(1, parseInt(page) || 1);

    // Build filter
    const filter = {};
    if (search)   filter.name     = { $regex: search, $options: 'i' };
    if (category && CATEGORIES.includes(category)) filter.category = category;
    if (minPrice !== '' || maxPrice !== '') {
      filter.price = {};
      if (minPrice !== '') filter.price.$gte = parseFloat(minPrice);
      if (maxPrice !== '') filter.price.$lte = parseFloat(maxPrice);
    }

    const sortObj = SORT_OPTIONS[sort] || SORT_OPTIONS['name-asc'];
    const total      = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / LIMIT) || 1;
    const skip       = (currentPage - 1) * LIMIT;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(LIMIT);

    res.render('products/index', {
      title: 'Apple Store – Product Catalog',
      products,
      currentPage,
      totalPages,
      total,
      categories: CATEGORIES,
      query: { search, category, minPrice, maxPrice, sort }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
