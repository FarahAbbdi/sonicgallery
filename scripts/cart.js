// cart.js

export function setupCartSidebar() {
    const cartBtn = document.querySelector(".btn-cart");
    const cartSidebar = document.querySelector(".cart-sidebar");
    const closeBtn = document.querySelector(".close-cart-btn");
    const overlay = document.querySelector(".cart-overlay");
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
}