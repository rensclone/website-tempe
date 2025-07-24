fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('product-list');
    data.forEach(product => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <strong>Rp ${product.price}</strong>
      `;
      container.appendChild(card);
    });
  });
