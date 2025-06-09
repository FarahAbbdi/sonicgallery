// Load cart items from localStorage or initialize as empty array
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

/**
 * Initialize and set up cart sidebar functionality and event listeners.
 */
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
        // Close other overlays if open
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

    checkoutBtn?.addEventListener("click", () => {
        if (cartItems.length > 0) {
        window.location.href = "../pages/checkout.html";
        }
    });

    // Initial render if cart already has items
    renderCartItems();
}

/**
 * Clears all items from the cart.
 */
export function clearCart() {
    cartItems = [];
    localStorage.removeItem("cartItems");
    renderCartItems();
}

/**
 * Adds a product to the cart or increments its quantity if it already exists.
 * @param {Object} product - Product to add (must have at least a `title` property).
 */
export function addToCart(product) {
    const existingItem = cartItems.find(
        (item) =>
        item.title?.trim().toLowerCase() === product.title?.trim().toLowerCase()
    );

    if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    saveCartAndRender();
}

/**
 * Save cart to localStorage and update UI.
 */
function saveCartAndRender() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCartItems();
}

/**
 * Render cart items inside the cart sidebar.
 */
function renderCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotalCount = document.querySelector(".cart-total p:first-child");
    const cartTotalPrice = document.querySelector(".cart-total p:last-child");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = ""; // Clear existing content

    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const quantity = item.quantity || 1;

        const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        totalPrice += price * quantity;

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
    });

    if (cartTotalCount) {
        cartTotalCount.textContent = `Subtotal (${cartItems.length} item${cartItems.length !== 1 ? "s" : ""}):`;
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    attachCartEventListeners();
}

/**
 * Attach event listeners for remove and quantity buttons within cart items.
 */
function attachCartEventListeners() {
    const cartItemsContainer = document.querySelector(".cart-items");
    if (!cartItemsContainer) return;

    // Remove item buttons
    cartItemsContainer.querySelectorAll(".remove-item-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
        const itemIndex = e.target.closest(".cart-item").dataset.index;
        removeCartItem(Number(itemIndex));
        });
    });

    // Quantity increase buttons
    cartItemsContainer.querySelectorAll(".quantity-btn.increase").forEach((button) => {
        button.addEventListener("click", (e) => {
        const itemIndex = Number(e.target.dataset.index);
        increaseQuantity(itemIndex);
        });
    });

    // Quantity decrease buttons
    cartItemsContainer.querySelectorAll(".quantity-btn.decrease").forEach((button) => {
        button.addEventListener("click", (e) => {
        const itemIndex = Number(e.target.dataset.index);
        decreaseQuantity(itemIndex);
        });
    });
}

/**
 * Increase quantity of a cart item by index.
 * @param {number} index
 */
function increaseQuantity(index) {
    if (cartItems[index]) {
        cartItems[index].quantity = (cartItems[index].quantity || 1) + 1;
        saveCartAndRender();
    }
}

/**
 * Decrease quantity of a cart item by index, or remove if quantity reaches zero.
 * @param {number} index
 */
function decreaseQuantity(index) {
    if (cartItems[index]) {
        if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        saveCartAndRender();
        } else {
        removeCartItem(index);
        }
    }
}

/**
 * Remove a cart item by index.
 * @param {number} index
 */
function removeCartItem(index) {
    cartItems.splice(index, 1);
    saveCartAndRender();
}

/**
 * Render cart items on the checkout page.
 */
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
        const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        totalPrice += price * quantity;

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
    });

    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${totalPrice.toFixed(2)}`;
    if (checkoutOrderTotal) checkoutOrderTotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (taxesNote) {
        const tax = totalPrice * 0.1; // Example 10% tax
        taxesNote.textContent = `Including $${tax.toFixed(2)} in taxes`;
    }
}