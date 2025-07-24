function loadProducts() {
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('product-list');

      if (products.length === 0) {
        container.innerHTML = "<p>Belum ada produk tersedia.</p>";
        return;
      }

      container.innerHTML = ""; // bersihkan isi sebelumnya
      products.forEach(product => {
        const card = document.createElement('div');
        const isOutOfStock = product.stock <= 0;

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" style="width:100%; max-width:250px; border-radius:12px; margin-bottom:10px; ${isOutOfStock ? 'filter: grayscale(100%); opacity: 0.5;' : ''}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Stok: ${product.stock}</p>
          <strong>Rp ${product.price.toLocaleString()}</strong><br><br>
          <button ${isOutOfStock ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''} onclick='addToCart(${JSON.stringify(product)})'>${isOutOfStock ? 'Stok Habis' : 'Tambah ke Keranjang'}</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Gagal mengambil data produk:', error);
      document.getElementById('product-list').innerHTML = "<p>Terjadi kesalahan memuat produk.</p>";
    });
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item._id === product._id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
}
