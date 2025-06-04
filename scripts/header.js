// header.js

// === DROPDOWN MENU LOGIC (Desktop) ===
export function setupDropdownMenu() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownNav = document.querySelector(".dropdown-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!dropdownToggle || !dropdownNav || !overlay) return;

    // Close dropdown and reset states
    function closeDropdown() {
        dropdownNav.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("body-lock");
        overlay.classList.remove("show");
    }

    // Show/hide dropdown based on viewport width
    function checkViewport() {
        if (window.innerWidth <= 1000) {
            closeDropdown();
            dropdownNav.style.display = "none";
            dropdownToggle.style.display = "none";
        } else {
            dropdownNav.style.display = "";
            dropdownToggle.style.display = "";
        }
    }

    checkViewport();
    window.addEventListener("resize", checkViewport);

    // Toggle dropdown open/close on click
    dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (dropdownNav.style.display === "none") return;

        const isOpen = dropdownNav.classList.contains("open");

        if (isOpen) {
            closeDropdown();
        } else {
            // Close search overlay if open before opening dropdown
            const searchOverlay = document.querySelector(".search-overlay");
            const searchButton = document.querySelector(".btn-search");
            if (searchOverlay && searchOverlay.classList.contains("open")) {
                searchOverlay.classList.remove("open");
                overlay.classList.remove("show");
                body.classList.remove("body-lock");
                if (searchButton) searchButton.setAttribute("aria-expanded", "false");
            }

            dropdownNav.classList.add("open");
            dropdownToggle.setAttribute("aria-expanded", "true");
            body.classList.add("body-lock");
            overlay.classList.add("show");
        }
    });

    // Close dropdown when clicking on overlay
    overlay.addEventListener("click", () => {
        if (dropdownNav.classList.contains("open")) closeDropdown();
    });

    // Close dropdown if clicking outside
    document.addEventListener("click", (e) => {
        if (
            dropdownNav.classList.contains("open") &&
            !dropdownNav.contains(e.target) &&
            !dropdownToggle.contains(e.target)
        ) {
            closeDropdown();
        }
    });

    // Close dropdown on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdownNav.classList.contains("open")) {
            closeDropdown();
        }
    });
}

// === SIDEBAR NAVIGATION (Mobile) ===
export function setupSidebarNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!menuToggle || !sidebar || !overlay) return;

    // Open sidebar and show overlay
    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    // Close sidebar and hide overlay
    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
    }

    // Toggle sidebar open/close on menu button click
    menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
        closeSidebar();
        } else {
        openSidebar();
        }
    });

    // Close sidebar when clicking overlay
    overlay.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
        closeSidebar();
        }
    });

    // Auto-close sidebar if viewport width exceeds 1000px
    window.addEventListener("resize", () => {
        const isSidebarOpen = sidebar.classList.contains("open")
        if (window.innerWidth > 1000 && sidebar.classList.contains("open")) {
        closeSidebar();
        }
        // Keep overlay and scroll lock if dropdown OR sidebar is open
        const isDropdownOpen = document.querySelector(".dropdown-nav")?.classList.contains("open");

        if (isSidebarOpen || isDropdownOpen) {
            overlay.classList.add("show");
            body.classList.add("body-lock");
        } else {
            overlay.classList.remove("show");
            body.classList.remove("body-lock");
        }
    });

    // === Sidebar dropdown toggle for Clothing submenu ===
    const sidebarDropdownToggle = sidebar.querySelector(".sidebar-dropdown-toggle");
    const sidebarSubmenu = sidebar.querySelector(".sidebar-submenu");

    if (sidebarDropdownToggle && sidebarSubmenu) {
        sidebarDropdownToggle.addEventListener("click", () => {
        const isShown = sidebarSubmenu.classList.toggle("show");
        sidebarDropdownToggle.setAttribute("aria-expanded", isShown.toString());
        });
    }
}