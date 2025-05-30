document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById("cartItems");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById("totalPrice").textContent = "Total: $0";
      return;
    }
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-img"/>
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
    document.getElementById("totalPrice").textContent = `Total: $${total}`;
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
  }

  window.checkout = function() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const order = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toLocaleString()
    };
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");
    alert("Order placed successfully!");
    location.reload();
  }

  displayCart();
});
