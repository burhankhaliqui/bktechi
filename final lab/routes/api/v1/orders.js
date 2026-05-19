const express = require('express');
const Order = require('../../../models/Order');
const verifyToken = require('../../../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { items, total } = req.body;
  if (!Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
    return res.status(400).json({ msg: 'Items and total are required' });
  }

  try {
    const order = await Order.create({
      user: req.user.user_id,
      items,
      total,
      status: 'pending'
    });

    return res.status(201).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
