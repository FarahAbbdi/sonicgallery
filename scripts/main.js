import { includeHTML } from "/scripts/include.js";
import { setupDropdown } from "/scripts/dropdown.js";

// Load components
includeHTML("#site-header", "/components/header.html");
includeHTML("#site-footer", "/components/footer.html");

// Handle dropdown logic when header is loaded
document.addEventListener("htmlIncluded", (e) => {
    if (e.target.matches("#site-header")) {
        setupDropdown(); // safely runs only after header is in DOM
    }
});