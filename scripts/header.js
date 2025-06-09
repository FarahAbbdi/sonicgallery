/**
 * Initializes dropdown menu toggle, open/close behaviors, and related event listeners.
 */
export function setupDropdownMenu() {
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownNav = document.querySelector(".dropdown-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!dropdownToggle || !dropdownNav || !overlay) return;

    /**
     * Opens the dropdown menu and applies necessary UI states.
     */
    function openDropdown() {
        closeSearchOverlay();
        dropdownNav.classList.add("open");
        dropdownToggle.setAttribute("aria-expanded", "true");
        body.classList.add("body-lock");
        overlay.classList.add("show");
    }

    /**
     * Closes the dropdown menu and resets UI states.
     */
    function closeDropdown() {
        dropdownNav.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("body-lock");
        overlay.classList.remove("show");
    }

    /**
     * Shows or hides dropdown toggle and nav based on viewport width.
     */
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

    dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (dropdownNav.style.display === "none") return;

        if (dropdownNav.classList.contains("open")) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    /**
     * Closes dropdown when clicking on overlay.
     */
    overlay.addEventListener("click", () => {
        if (dropdownNav.classList.contains("open")) closeDropdown();
    });

    /**
     * Closes dropdown if clicking outside dropdown or toggle button.
     */
    document.addEventListener("click", (e) => {
        if (
            dropdownNav.classList.contains("open") &&
            !dropdownNav.contains(e.target) &&
            !dropdownToggle.contains(e.target)
        ) {
            closeDropdown();
        }
    });

    /**
     * Closes dropdown on Escape key press.
     */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdownNav.classList.contains("open")) {
            closeDropdown();
        }
    });
}

/**
 * Initializes sidebar navigation toggle, submenu, and related event listeners.
 */
export function setupSidebarNavigation() {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar-nav");
    const overlay = document.querySelector(".overlay");
    const body = document.body;

    if (!menuToggle || !sidebar || !overlay) return;

    /**
     * Opens the sidebar navigation and updates UI states.
     */
    function openSidebar() {
        closeSearchOverlay();
        sidebar.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    /**
     * Closes the sidebar navigation and resets UI states.
     */
    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
    }

    menuToggle.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    /**
     * Closes sidebar when clicking on overlay.
     */
    overlay.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            closeSidebar();
        }
    });

    /**
     * Auto-close sidebar and manage overlay & scroll lock on window resize.
     */
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1000 && sidebar.classList.contains("open")) {
            closeSidebar();
        }

        const dropdownOpen = document.querySelector(".dropdown-nav")?.classList.contains("open");
        const sidebarOpen = sidebar.classList.contains("open");

        if (dropdownOpen || sidebarOpen) {
            overlay.classList.add("show");
            body.classList.add("body-lock");
        } else {
            overlay.classList.remove("show");
            body.classList.remove("body-lock");
        }
    });

    // Sidebar submenu toggle
    const sidebarDropdownToggle = sidebar.querySelector(".sidebar-dropdown-toggle");
    const sidebarSubmenu = sidebar.querySelector(".sidebar-submenu");

    if (sidebarDropdownToggle && sidebarSubmenu) {
        sidebarDropdownToggle.addEventListener("click", () => {
            const isShown = sidebarSubmenu.classList.toggle("show");
            sidebarDropdownToggle.setAttribute("aria-expanded", isShown.toString());
        });
    }
}

/**
 * Closes the search overlay and resets its UI elements.
 */
function closeSearchOverlay() {
    const searchOverlay = document.querySelector(".search-overlay");
    const overlay = document.querySelector(".overlay");
    const body = document.body;
    const searchInput = document.querySelector(".search-overlay input[type='search']");
    const searchResults = document.querySelector(".search-results");

    if (!searchOverlay || !overlay || !body || !searchInput || !searchResults) return;

    searchOverlay.classList.remove("open");
    overlay.classList.remove("show");
    body.classList.remove("body-lock");
    searchInput.value = "";
    searchResults.innerHTML = "";
}