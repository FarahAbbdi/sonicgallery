// header.js

export function setupDropdownMenu() {
    const toggle = document.querySelector(".dropdown-toggle");
    const dropdownNav = document.querySelector(".dropdown-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!toggle || !dropdownNav || !overlay) return;

    function closeDropdown() {
        dropdownNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", false);
        body.classList.remove("body-lock");
        overlay.classList.remove("show");
    }

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

    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (dropdownNav.style.display === "none") return;

        const isOpen = dropdownNav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
        body.classList.add("body-lock");
        overlay.classList.add("show");
        } else {
        closeDropdown();
        }
    });

    // Close dropdown when clicking overlay
    overlay.addEventListener("click", () => {
        if (dropdownNav.classList.contains("open")) {
        closeDropdown();
        }
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", (e) => {
        if (
        dropdownNav.classList.contains("open") &&
        !dropdownNav.contains(e.target) &&
        !toggle.contains(e.target)
        ) {
        closeDropdown();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdownNav.classList.contains("open")) {
        closeDropdown();
        }
    });
}

// Sidebar toggle for mobile / small screens
export function setupSidebarNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!menuToggle || !sidebar || !overlay) return;

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
    }

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
        closeSidebar();
        } else {
        openSidebar();
        }
    });

    overlay.addEventListener("click", closeSidebar);

    // Close sidebar if viewport grows larger than 1000px
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1000 && sidebar.classList.contains("open")) {
        closeSidebar();
        }
    });
}
