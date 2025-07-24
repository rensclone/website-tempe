let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartDiv = document.getElementById('cart');
const totalEl = document.getElementById('total');

function renderCart() {
  cartDiv.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${item.name}</strong> - Rp ${item.price.toLocaleString()} x ${item.qty} = <strong>Rp ${itemTotal.toLocaleString()}</strong></p>
      <button onclick="changeQty(${index}, 1)">➕</button>
      <button onclick="changeQty(${index}, -1)">➖</button>
      <button onclick="removeItem(${index})">❌ Hapus</button>
      <hr>
    `;
    cartDiv.appendChild(div);
  });

  totalEl.innerText = `Rp ${total.toLocaleString()}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

async function checkoutWhatsApp() {
  const name = document.getElementById('buyerName').value;
  const address = document.getElementById('buyerAddress').value;

  if (!name || !address) {
    alert("Silakan isi nama dan alamat.");
    return;
  }

  try {
    const response = await fetch('http://52.65.26.54:5000/api/products/reduce-stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart })
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || 'Gagal memperbarui stok');
      return;
    }

    // Buat pesan WhatsApp
    let total = 0;
    let message = `Halo, saya mau pesan:\n`;
    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      message += `- ${item.name} (${item.qty} pcs)\n`;
    });

    message += `\nTotal: Rp ${total.toLocaleString()}\n`;
    message += `Nama: ${name}\nAlamat: ${address}`;

    const phone = '6285921811396';
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Kosongkan keranjang dan redirect ke WhatsApp
    localStorage.removeItem('cart');
    window.open(waUrl, '_blank');
    window.location.href = "index.html";

  } catch (err) {
    alert('Terjadi kesalahan saat checkout.');
    console.error(err);
  }
}

renderCart();
