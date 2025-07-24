// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Impor fungsi dari controller
const { getProducts, addProduct, reduceStockAfterCheckout, updateProduct, deleteProduct } = require('../controllers/productController');

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Nama file unik
  }
});

const upload = multer({ storage: storage });

// Definisi Rute
// GET /api/products -> Mengambil semua produk
router.get('/', getProducts);

// POST /api/products -> Menambahkan produk baru
router.post('/', upload.single('image'), addProduct);

//New Routes
router.post('/reduce-stock', reduceStockAfterCheckout);

// Simpan Produk
router.put('/:id', updateProduct);

// Hapus Produk
router.delete('/:id', deleteProduct);

module.exports = router;