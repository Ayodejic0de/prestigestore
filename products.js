
            async function getProducts() {
     try{
       const response = await fetch("https://fakestoreapi.com/products");
       const products = await response.json()
        console.log(products);

       const productList = document.querySelector("#product-list");

       products.forEach((product) => {
         const productCard = document.createElement("div");

        productCard.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <h2>${product.title}</h2>
  <p>${product.description}</p>
  <p><strong>$${product.price}</strong></p>
  <div class="quantity-container">
    <label for="quantity-${product.id}">Qty:</label>
    <input type="number" min="1" value="1" id="quantity-${product.id}" class="quantity-input" />
  </div>
  <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
`;

        productList.appendChild(productCard);
      });

    } catch(error) {
      console.error("Error", error);
    }
 }
getProducts();

let products = [];

async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        console.log(products);

        const productList = document.querySelector("#product-list");

        products.forEach((product) => {
            const productCard = document.createElement("div");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p><strong>$${product.price}</strong></p>
                <div class="quantity-container">
                    <label for="quantity-${product.id}">Qty:</label>
                    <input type="number" min="1" value="1" id="quantity-${product.id}" class="quantity-input" />
                </div>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;

            productList.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error", error);
    }
}

getProducts();

document.getElementById("searchInput").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = "";

    if (query.length === 0) return;

    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));

    filteredProducts.slice(0, 5).forEach(product => {
        const div = document.createElement("div");
        div.textContent = product.title;
        div.addEventListener("click", function() {
            document.getElementById("searchInput").value = product.title;
            suggestionsBox.innerHTML = "";
        });
        suggestionsBox.appendChild(div);
    });
});

// Hide suggestions on outside click
document.addEventListener("click", function(event) {
    if (!event.target.closest('.nav-search')) {
        document.getElementById("suggestions").innerHTML = "";
    }
});



let cart = [];

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("add-to-cart-btn")) {
    const productId = e.target.getAttribute("data-id");
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);

    if (quantity < 1 || isNaN(quantity)) {
      alert("Please enter a valid quantity.");
      return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ id: productId, quantity: quantity });
    }

    updateCartCount();
    alert(`Added ${quantity} item(s) to the cart.`);
  }
});

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

getProducts();


        