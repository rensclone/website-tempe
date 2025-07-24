// ✅ FILE: controllers/productController.js

const Product = require('../models/product');

// Ambil semua produk
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil produk', error });
  }
};

// Tambah produk baru
const addProduct = async (req, res) => {
  try {
    // Jika ada file gambar yang diupload
    let productData = req.body;
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    
    const newProduct = new Product(productData);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan produk', error });
  }
};

// Kurangi stok setelah checkout
const reduceStockAfterCheckout = async (req, res) => {
  try {
    const updates = req.body;
    const updatePromises = updates.map(async (item) => {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity },
      });
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: 'Stok diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengurangi stok', error: err });
  }
};

// ✅ UPDATE produk - DIPERBAIKI
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    
    const updated = await Product.findByIdAndUpdate(productId, updateData, { 
      new: true,
      runValidators: true 
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Gagal memperbarui produk', error: err.message });
  }
};

// ✅ HAPUS produk - DIPERBAIKI
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    const deleted = await Product.findByIdAndDelete(productId);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    
    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Gagal menghapus produk', error: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  reduceStockAfterCheckout,
  updateProduct,
  deleteProduct,
};