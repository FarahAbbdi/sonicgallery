// cart.js

// Load from localStorage if available, or initialize empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

export function setupCartSidebar() {
    const cartBtn = document.querySelector(".btn-cart");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const closeBtn = document.querySelector(".close-cart-btn");
    const overlay = document.querySelector(".cart-overlay");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const body = document.body;

    if (!cartBtn || !cartSidebar || !closeBtn || !overlay) return;

    function openCart() {
        cartSidebar.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    function closeCart() {
        cartSidebar.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
    }

    cartBtn.addEventListener("click", () => {
        document.querySelector(".search-overlay")?.classList.remove("open");
        document.querySelector(".dropdown-nav")?.classList.remove("open");
        document.querySelector(".sidebar-nav")?.classList.remove("open");
        document.querySelector(".overlay")?.classList.remove("show");

        openCart();
    });
    
    closeBtn.addEventListener("click", closeCart);

    overlay.addEventListener("click", () => {
        if (cartSidebar.classList.contains("open")) closeCart();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartSidebar.classList.contains("open")) {
        closeCart();
        }
    });

    checkoutBtn.addEventListener("click", () => {
        if (cartItems.length > 0) window.location.href = '../pages/checkout.html';
    });

    // Initial render in case cart is already populated
    renderCartItems();
}

// Clears the cart completely
export function clearCart() {
    cartItems = []; // Clear in-memory array
    localStorage.removeItem("cartItems"); // Remove from localStorage
    renderCartItems(); // Update UI
}

// Adds product to cart, updates localStorage and re-renders UI
export function addToCart(product) {
    // More robust duplicate checking
    const existingItem = cartItems.find(item => 
        item.title?.trim().toLowerCase() === product.title?.trim().toLowerCase()
    );

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // Create a copy to avoid reference issues
        const newProduct = { ...product, quantity: 1 };
        cartItems.push(newProduct);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
}

// Renders the current items in cartItems to the sidebar
function renderCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalCount = document.querySelector(".cart-total p:first-child");
    const cartTotalPrice = document.querySelector(".cart-total p:last-child");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ""; // Clear existing items

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const quantity = item.quantity || 1;

        const itemHTML = `
            <div class="cart-item" data-index="${index}">
                <div class="cart-content">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="cart-item-info">
                        <p>${item.title}</p>
                        <p>${item.price}</p>
                        <p>Quantity: ${quantity}</p>
                        <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-index="${index}">-</button>
                        <button class="quantity-btn increase" data-index="${index}">+</button>
                    </div>
                    </div>
                </div>
                <button class="remove-item-btn" aria-label="Remove">
                    <svg class="trash-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6L18.4 19.4C18.3 20.6 17.3 21.5 16.1 21.5H7.9C6.7 21.5 5.7 20.6 5.6 19.4L5 6H19Z"></path>
                        <path d="M10 11V17"></path>
                        <path d="M14 11V17"></path>
                    </svg>
                </button>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);

        // Extract numeric value from price
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        totalPrice += isNaN(price) ? 0 : price * quantity;
    });

    // Update subtotal display
    if (cartTotalCount) {
        cartTotalCount.textContent = `Subtotal (${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}):`;
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Attach event listeners to all remove buttons
    attachCartEventListeners();
}

function attachCartEventListeners() {
    const cartItemsContainer = document.querySelector(".cart-items");
    if (!cartItemsContainer) return;

    // Remove item buttons
    cartItemsContainer.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemIndex = e.target.closest(".cart-item").dataset.index;
            removeCartItem(parseInt(itemIndex));
        });
    });

    // Quantity increase buttons
    cartItemsContainer.querySelectorAll(".quantity-btn.increase").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemIndex = parseInt(e.target.dataset.index);
            increaseQuantity(itemIndex);
        });
    });

    // Quantity decrease buttons
    cartItemsContainer.querySelectorAll(".quantity-btn.decrease").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemIndex = parseInt(e.target.dataset.index);
            decreaseQuantity(itemIndex);
        });
    });
}

// Increase item quantity
function increaseQuantity(index) {
    if (cartItems[index]) {
        cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCartItems();
    }
}

// Decrease item quantity
function decreaseQuantity(index) {
    if (cartItems[index]) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            renderCartItems();
        } else {
            // If quantity is 1, remove item entirely
            removeCartItem(index);
        }
    }
}

function removeCartItem(index) {
    cartItems.splice(index, 1); // Remove item from array
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update storage
    renderCartItems(); // Re-render
}

// Function to print cart items to checkout page
export function renderCheckoutItems() {
    const checkoutOrderContainer = document.querySelector(".order-items");
    const checkoutSubtotal = document.querySelector(".checkout-subtotal");
    const checkoutOrderTotal = document.querySelector(".checkout-order-total");
    const taxesNote = document.querySelector(".taxes-note");

    if (!checkoutOrderContainer) return;

    checkoutOrderContainer.innerHTML = ""; // Clear existing content

    let totalPrice = 0;

    cartItems.forEach((item) => {
        const quantity = item.quantity || 1;

        const itemHTML = `
        <div class="order-item">
            <div class="item-image">
            <img src="${item.image}" alt="${item.title}" style="width: 60px;" />
            <div class="item-badge">${quantity}</div>
            </div>
            <div class="item-details">
            <div class="item-name">${item.title}</div>
            </div>
            <div class="item-price">${item.price}</div>
        </div>
        `;
        checkoutOrderContainer.insertAdjacentHTML("beforeend", itemHTML);

        // Extract numeric value from price
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        totalPrice += isNaN(price) ? 0 : price * quantity;

    });

    if (checkoutSubtotal) {
        checkoutSubtotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    if (checkoutOrderTotal) {
        checkoutOrderTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    if (taxesNote) {
        const tax = totalPrice * 0.1;
        taxesNote.textContent = `Including $${tax.toFixed(2)} in taxes`;
    }
}

console.log(cartItems);