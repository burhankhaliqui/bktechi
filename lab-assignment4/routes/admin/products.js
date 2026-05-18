const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Product = require('../../models/Product');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `product-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|gif/.test(file.mimetype);
    cb(ok ? null : new Error('Images only'), ok);
  }
});

const requiredFields = ['name', 'description', 'price', 'category', 'stock'];

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render('admin/products/index', {
      title: 'Manage Products',
      products
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/new', (req, res) => {
  res.render('admin/products/new', {
    title: 'New Product',
    errors: [],
    form: {}
  });
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const errors = requiredFields.filter(field => !req.body[field]);
    if (errors.length) {
      return res.render('admin/products/new', {
        title: 'New Product',
        errors,
        form: req.body
      });
    }

    const productData = { ...req.body };
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    await Product.create(productData);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/admin/products');

    res.render('admin/products/edit', {
      title: 'Edit Product',
      product,
      errors: []
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/edit/:id', upload.single('image'), async (req, res) => {
  try {
    const errors = requiredFields.filter(field => !req.body[field]);
    if (errors.length) {
      return res.render('admin/products/edit', {
        title: 'Edit Product',
        product: { _id: req.params.id, ...req.body },
        errors
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.redirect('/admin/products');

    const updateData = { ...req.body };
    if (req.file) {
      if (product.image && product.image.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '../../public', product.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.image = `/uploads/${req.file.filename}`;
    }

    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product && product.image && product.image.startsWith('/uploads/')) {
      const imgPath = path.join(__dirname, '../../public', product.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
