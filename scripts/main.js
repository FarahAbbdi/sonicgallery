// main.js

import { includeHTML } from "/scripts/include.js";
import { setupDropdownMenu, setupSidebarNavigation } from "/scripts/header.js";

// Load reusable components into the DOM
includeHTML("#site-header", "/components/header.html");
includeHTML("#site-footer", "/components/footer.html");

// Run logic after header is loaded
document.addEventListener("htmlIncluded", (e) => {
    if (e.target.matches("#site-header")) {
        setupDropdownMenu();       // Handles dropdown toggle for "Clothing"
        setupSidebarNavigation();   // Handles responsive mobile sidebar
    }
});