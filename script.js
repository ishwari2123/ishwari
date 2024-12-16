// Simulated Data for Pizzas
const pizzas = [
    {id: 1, name: "Pepperoni Pizza", price: 499, image: "peperoni.jpeg"},
    {id: 2, name: "BBQ Chicken Pizza", price: 599, image: "bbq.jpeg"},
    {id: 3, name: "Veggie Delight Pizza", price: 399, image: "veg.jpeg"},
    {id: 4, name: "Special Offer Pizza", price: 299, image: "byone.jpeg"}
];

// Load Pizzas on Order Page
function loadPizzas() {
    const pizzaContainer = document.getElementById("pizza-container");
    pizzaContainer.innerHTML = pizzas.map(pizza => `
        <div class="col-md-3">
            <div class="card mb-3">
                <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <p class="card-text">Price: ₹${pizza.price}</p>
                    <button class="btn btn-primary" onclick="addToCart(${pizza.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", loadPizzas);

// Add Item to Cart
function addToCart(pizzaId) {
    const pizza = pizzas.find(p => p.id === pizzaId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(pizza);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show the modal
    const addToCartModal = new bootstrap.Modal(document.getElementById('addToCartModal'));
    addToCartModal.show();

    // Update cart items on the page
    if (document.getElementById("cart-items")) {
        displayCartItems(cart);
    }
}

// Display Cart Items in cart.html
function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItems = cartItems.length;
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    // Summary
    document.getElementById("total-items").textContent = `Total: ${totalItems}`;
    document.getElementById("total-price").textContent = `₹${totalPrice}`;

    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
        <div class="card mb-3">
            <img src="${item.image}" class="card-img-top" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">₹${item.price}</p>
                <button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('') || "<p>Your cart is empty!</p>";

    // Enable or disable the "Order Now" button
    const orderBtn = document.getElementById("order-btn");
    if (orderBtn) {
        orderBtn.disabled = cartItems.length === 0;
    }
}

// Remove Item from Cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    // Log to console to check the cart status
    console.log("Cart after removing item:", cart);

    displayCartItems(cart);
}

// Load Cart on Page Load
document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Log to console to check the loaded cart
    console.log("Cart on page load:", cartItems);

    if (document.getElementById("cart-items")) {
        displayCartItems(cartItems);
    }
});

// Confirm Order
function confirmOrder() {
    // Collect user details
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const addressType = document.getElementById("address-type").value;

    // Validate form fields
    if (!name || !email || !phone || !address || !addressType) {
        alert("Please fill in all the details!");
        return;
    }

    // Confirm order
    alert(`Thank you for your order, Name: ${name}!\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\n${addressType}`);

    // Clear cart from localStorage
    localStorage.removeItem("cart");

    // Log to console to check if the cart is removed
    console.log("Cart after order confirmation:", JSON.parse(localStorage.getItem('cart')));

    // Reload the page to update the cart view
    window.location.href = window.location.href; // Refresh the page
}
