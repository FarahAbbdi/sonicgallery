export function setupDropdown() {
    const toggle = document.querySelector(".dropdown-toggle");
    const dropdownNav = document.querySelector(".dropdown-nav");
    const body = document.body;
    const main = document.querySelector("main");

    if (!toggle || !dropdownNav) return;

    // Close the dropdown and reset states
    function closeDropdown() {
        dropdownNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
        body.classList.remove("body-lock"); // unlock body scroll
        if (main) main.classList.remove("dimmed"); // remove dim effect
    }

    // Show/hide dropdown and toggle based on viewport width
    function checkViewport() {
        if (window.innerWidth <= 1000) {
        closeDropdown();
        dropdownNav.style.display = "none";
        toggle.style.display = "none";
        } else {
        dropdownNav.style.display = "";
        toggle.style.display = "";
        }
    }

    checkViewport();
    window.addEventListener("resize", checkViewport);

    // Handle dropdown toggle button click
    toggle.addEventListener("click", (event) => {
        event.stopPropagation(); // prevent event bubbling to document
        if (dropdownNav.style.display === "none") return;
        const isOpen = dropdownNav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
        body.classList.add("body-lock"); // lock body scroll
        if (main) main.classList.add("dimmed"); // dim main content
        } else {
        closeDropdown();
        }
    });

    // Close dropdown if clicking outside of it
    document.addEventListener("click", () => {
        if (dropdownNav.classList.contains("open")) closeDropdown();
    });

    // Close dropdown on Escape key press
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && dropdownNav.classList.contains("open")) closeDropdown();
    });
}