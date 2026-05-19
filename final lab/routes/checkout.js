const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

router.get('/', (req, res) => {
  const cart = req.session.cart || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  res.render('checkout', {
    title: 'Checkout',
    cart,
    total
  });
});

router.post('/', async (req, res) => {
  const cart = req.session.cart || [];

  if (cart.length === 0) {
    req.flash('error', 'Your bag is empty.');
    return res.redirect('/checkout');
  }

  try {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    await Order.create({
      user: req.session.user._id,
      items: cart.map(item => ({
        product: item.name,
        qty: item.qty
      })),
      total,
      status: 'completed'
    });

    for (const item of cart) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.qty }
      });
    }

    req.session.cart = [];
    req.flash('success', 'Checkout completed successfully.');
    return res.redirect('/products');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
