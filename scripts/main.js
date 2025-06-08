// main.js

import { includeHTML, loadProductGrid } from "/scripts/include.js";
import { setupDropdownMenu, setupSidebarNavigation} from "/scripts/header.js";
import { loadProductDetail } from "/scripts/product-detail.js";
import { setupSearchOverlay, loadSearchData } from "/scripts/search.js";
import { setupCartSidebar, renderCheckoutItems, clearCart} from "/scripts/cart.js";

// Load reusable components
includeHTML("#site-header", "/components/header.html");
includeHTML("#site-footer", "/components/footer.html");
includeHTML("#product-grid-container", "/components/product-grid.html");

// Determine which JSON to load based on filename
function getJsonPathFromPage() {
  const path = window.location.pathname;
  const filename = path.substring(path.lastIndexOf("/") + 1).replace(".html", "");
  return `/data/${filename}.json`; // Returns e.g. /data/tshirts.json
}

// Run logic after components load
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

// At the very end of main.js, after all the includeHTML calls
document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutItems();
});

const confirmOrderBtn = document.querySelector(".pay-button");

confirmOrderBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    clearCart(); // Clear both memory and localStorage

    renderCheckoutItems();  // Refresh checkout UI
    
    window.location.href = "../pages/confirmation.html";
});