const express = require('express');
const Order = require('../models/Order');
const { isAdmin } = require('../middlewares/auth');

const router = express.Router();

async function getSalesStats() {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const totalOrders = await Order.countDocuments();

  const revenueResult = await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
  ]);

  const topProductResult = await Order.aggregate([
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.product',
        quantitySold: { $sum: '$items.qty' }
      }
    },
    { $sort: { quantitySold: -1 } },
    { $limit: 1 }
  ]);

  return {
    totalRevenue: revenueResult[0] ? revenueResult[0].totalRevenue : 0,
    totalOrders,
    topProduct: topProductResult[0]
      ? topProductResult[0]._id
      : 'No sales yet',
    topProductQty: topProductResult[0]
      ? topProductResult[0].quantitySold
      : 0,
    recentOrders: orders
  };
}

function isAdminApi(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    return next();
  }

  if (!req.session || !req.session.user) {
    return res.status(401).json({ msg: 'Please log in as admin' });
  }

  return res.status(403).json({ msg: 'Admin access required' });
}

router.get('/sales', isAdmin, async (req, res) => {
  try {
    const stats = await getSalesStats();
    res.render('sales', {
      title: 'Sales Dashboard',
      stats
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/api/sales-data', isAdminApi, async (req, res) => {
  try {
    const stats = await getSalesStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
