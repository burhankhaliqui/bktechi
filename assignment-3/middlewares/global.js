module.exports = async (req, res, next) => {
  const Product = require('../models/Product');

  // Distinct categories for filter dropdown
  try {
    res.locals.categories = await Product.distinct('category');
  } catch {
    res.locals.categories = [];
  }

  next();
};
