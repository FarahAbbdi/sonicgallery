import { includeHTML, loadProductGrid } from "/scripts/include.js";
import { setupDropdownMenu, setupSidebarNavigation } from "/scripts/header.js";
import { loadProductDetail } from "/scripts/product-detail.js";
import { setupSearchOverlay, loadSearchData } from "/scripts/search.js";
import { setupCartSidebar, renderCheckoutItems, clearCart } from "/scripts/cart.js";

/**
 * Load reusable HTML components into the page.
 * Paths are relative **to the HTML file** (root), so no leading slash.
 */
includeHTML("#site-header", "/components/header.html");
includeHTML("#site-footer", "/components/footer.html");
includeHTML("#product-grid-container", "/components/product-grid.html");

/**
 * Get JSON data path based on current page filename.
 * 
 * @returns {string} Path to the JSON file for the current page.
 */
function getJsonPathFromPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");
    return `/data/${filename}.json`; // Example: /data/tshirts.json
}

/**
 * Initialize page components after reusable HTML is included.
 */
document.addEventListener("htmlIncluded", (e) => {
    if (e.target.matches("#site-header")) {
        setupDropdownMenu();
        setupSidebarNavigation();
        loadSearchData();
        setupSearchOverlay();
        setupCartSidebar();
    }

    if (document.getElementById("product-grid-container")) {
        const jsonPath = getJsonPathFromPage();
        loadProductGrid("product-grid-container", jsonPath);
    }

    if (document.getElementById("product-detail-container")) {
        loadProductDetail();
    }
});

/**
 * Render checkout items once the DOM content is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutItems();
});

const confirmOrderBtn = document.querySelector(".pay-button");

/**
 * Handles checkout confirmation: clears cart and navigates to confirmation page.
 */
confirmOrderBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    clearCart();          // Clear cart data
    renderCheckoutItems(); // Refresh checkout UI

    window.location.href = "../pages/confirmation.html";
});