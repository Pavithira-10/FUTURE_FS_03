// Update cart count on all pages
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelectorAll(".cart-count").forEach(count => {
    count.textContent = cart.length;
  });
}

// Add item to cart
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${name} has been added to your cart.`);
}

// Show cart items on cart.html
function loadCartItems() {
    function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  localStorage.removeItem("cart");
  loadCartItems(); // refresh cart view
  updateCartCount(); // update the cart icon count

  const msg = document.getElementById("order-message");
  if (msg) {
    msg.textContent = "✅ Your order has been placed successfully!";
    msg.style.color = "green";
  }
}

  const cartItemsDiv = document.getElementById("cart-items");
  const totalDiv = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalDiv.textContent = "Total: ₹0";
    return;
  }

  let html = "<ul>";
  let total = 0;
  cart.forEach((item, index) => {
    html += `
      <li>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})" style="margin-left: 1rem;">Remove</button>
      </li>`;
    total += item.price;
  });
  html += "</ul>";
  cartItemsDiv.innerHTML = html;
  totalDiv.textContent = `Total: ₹${total}`;
}

// Remove a single item
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCartItems();
  updateCartCount();
}

// Clear all items
function clearCart() {
  localStorage.removeItem("cart");
  loadCartItems();
  updateCartCount();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (document.getElementById("cart-items")) {
    loadCartItems();
  }
});
