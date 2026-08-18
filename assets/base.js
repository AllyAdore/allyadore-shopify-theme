// AllyAdore Shopify Theme JavaScript

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
  // Add to cart form submission
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  addToCartForms.forEach(form => {
    form.addEventListener('submit', handleAddToCart);
  });
});

function handleAddToCart(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const variantId = formData.get('id');
  const quantity = formData.get('quantity');
  
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: variantId,
      quantity: quantity,
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Added to cart:', data);
    alert('Product added to cart!');
    updateCartCount();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error adding product to cart');
  });
}

function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartLinks = document.querySelectorAll('.icon-link');
      cartLinks.forEach(link => {
        if (link.textContent.includes('Cart')) {
          link.textContent = `Cart (${cart.item_count})`;
        }
      });
    });
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
