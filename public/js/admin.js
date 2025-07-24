document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = document.getElementById('productForm');
  const formData = new FormData(form);

saveBtn.addEventListener('click', async () => {
  const updateProduct = {
    name: nameInput.value,
    description: descInput.value,
    price: parseInt(priceInput.value),
    stock: parseInt(stockInput.value),
    image: imageInput.value
  };

  const res = await fetch(`http://52.65.26.54:5000/api/products/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateProduct)
  });

  if (res.ok) {
    alert("Produk Berhasil Diperbarui");
    loadProducts();
  } else {
    alert("Produk Gagal Diperbarui");
  }
});

// Bagian Hapus Produk
deleteBtn.addEventListener('click', async () => {
    const confirmation = confirm('Yakin ingin menghapus produk?');
    if (!confirmation) return;

    try {
        const response = await fetch(`http://52.65.26.54:5000/api/products/${product._id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('✅ Produk berhasil dihapus!');
            location.reload();
        } else {
            const errorData = await response.json();
            alert('❌ Gagal menghapus produk: ' + errorData.message);
        }
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menghapus produk.');
    }
});

