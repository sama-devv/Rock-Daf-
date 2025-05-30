document.addEventListener('DOMContentLoaded', () => {
  const instruments = [
    {
      name: "Acoustic Guitar",
      category: "String Instruments",
      price: 150,
      image: "https://upload.wikimedia.org/wikipedia/commons/4/45/GuitareClassique5.png",
      description: "A versatile instrument used across genres."
    },
    {
      name: "Oud",
      category: "String Instruments",
      price: 180,
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Oud_Istanbul.jpg",
      description: "Popular traditional instrument in Middle East."
    },
    {
      name: "Drum Set",
      category: "Percussion Instruments",
      price: 300,
      image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Standard_Drum_Kit.jpg",
      description: "Complete drum set for modern drummers."
    },
    {
      name: "Djembe",
      category: "Percussion Instruments",
      price: 90,
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Djembe.jpg",
      description: "African drum known for its rich bass and slap."
    },
    {
      name: "Flute",
      category: "Wind Instruments",
      price: 60,
      image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Western_concert_flute_%28Yamaha%29.jpg",
      description: "Classical wind instrument with a soft sound."
    }
  ];

  localStorage.setItem("allProducts", JSON.stringify(instruments));

  const grid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

  function displayProducts(list) {
    grid.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <span>$${item.price}</span>
        <button onclick='addToCart(${JSON.stringify(item)})'>Add to Cart</button>
        <a href="details.html?name=${encodeURIComponent(item.name)}">View Details</a>
      `;
      grid.appendChild(card);
    });
  }

  function filterProducts() {
    const keyword = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = instruments.filter(item => {
      return (category === "all" || item.category === category) &&
             item.name.toLowerCase().includes(keyword);
    });
    displayProducts(filtered);
  }

  window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
  };

  if (grid && searchInput && categoryFilter) {
    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);
    displayProducts(instruments);
  }
});
