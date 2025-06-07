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
        window.location.href = '../pages/checkout.html';
    });

    // Initial render in case cart is already populated
    renderCartItems();
}

// Adds product to cart, updates localStorage and re-renders UI
export function addToCart(product) {
    cartItems.push(product);
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
        const itemHTML = `
            <div class="cart-item" data-index="${index}">
                <div class="cart-content">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="cart-item-info">
                        <p>${item.title}</p>
                        <p>${item.price}</p>
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
        totalPrice += isNaN(price) ? 0 : price;
    });

    // Update subtotal display
    if (cartTotalCount) {
        cartTotalCount.textContent = `Subtotal (${cartItems.length} item${cartItems.length !== 1 ? 's' : ''}):`;
    }

    if (cartTotalPrice) {
        cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    }

    // Attach event listeners to all remove buttons
    cartItemsContainer.querySelectorAll(".remove-item-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const itemIndex = e.target.closest(".cart-item").dataset.index;
            removeCartItem(parseInt(itemIndex));
        });
    });
}

function removeCartItem(index) {
    cartItems.splice(index, 1); // Remove item from array
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update storage
    renderCartItems(); // Re-render
}