let combinedData = [];

/**
 * Sets up search overlay functionality including open/close,
 * input listening, and UI state management.
 */
export function setupSearchOverlay() {
    const searchButton = document.querySelector(".btn-search");
    const cancelButton = document.querySelector(".cancel-search");
    const searchOverlay = document.querySelector(".search-overlay");
    const overlay = document.querySelector(".overlay");
    const body = document.body;
    const searchInput = document.querySelector(".search-overlay input[type='search']");
    const searchResults = document.querySelector(".search-results");

    if (!searchButton || !cancelButton || !searchOverlay || !overlay || !searchInput || !searchResults) return;

    /**
     * Opens the search overlay and applies UI lock.
     */
    function openSearch() {
        searchOverlay.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    /**
     * Closes the search overlay and clears input/results.
     */
    function closeSearch() {
        searchOverlay.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
        searchInput.value = "";
        searchResults.innerHTML = "";
    }

    /**
     * Closes the sidebar if it is currently open.
     * Does not remove overlay or body-lock since search overlay will handle that.
     */
    function closeSidebarIfOpen() {
        const sidebar = document.querySelector(".sidebar-nav");
        if (sidebar?.classList.contains("open")) {
            sidebar.classList.remove("open");
        }
    }

    // Toggle search overlay open/close when search button clicked
    searchButton.addEventListener("click", () => {
        const isOpen = searchOverlay.classList.toggle("open");
        searchButton.setAttribute("aria-expanded", isOpen.toString());

        if (isOpen) {
            closeSidebarIfOpen();

            const dropdownNav = document.querySelector(".dropdown-nav");
            const dropdownToggle = document.querySelector(".dropdown-toggle");
            if (dropdownNav?.classList.contains("open")) {
                dropdownNav.classList.remove("open");
                dropdownToggle?.setAttribute("aria-expanded", "false");
            }

            overlay.classList.add("show");
            body.classList.add("body-lock");
        } else {
            closeSearch();
        }
    });

    // Close search on cancel button click
    cancelButton.addEventListener("click", closeSearch);

    // Close search overlay on Escape key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("open")) {
            closeSearch();
        }
    });

    // Close search overlay when clicking outside on overlay if dropdown is not open
    overlay.addEventListener("click", () => {
        const isSearchOpen = searchOverlay.classList.contains("open");
        const isDropdownOpen = document.querySelector(".dropdown-nav")?.classList.contains("open");

        if (isSearchOpen && !isDropdownOpen) closeSearch();
    });

    // Trigger search on input change
    searchInput.addEventListener("input", () => {
        performSearch(searchInput.value);
    });

    // Maintain overlay and body-lock state on window resize
    window.addEventListener("resize", () => {
        const isSearchOpen = searchOverlay.classList.contains("open");
        const isDropdownOpen = document.querySelector(".dropdown-nav")?.classList.contains("open");

        if (isSearchOpen || isDropdownOpen) {
            overlay.classList.add("show");
            body.classList.add("body-lock");
        } else {
            overlay.classList.remove("show");
            body.classList.remove("body-lock");
        }
    });
}

/**
 * Loads and combines product data from multiple JSON files
 * to enable searching across all categories.
 */
export async function loadSearchData() {
    const files = [
        "accessories.json",
        "bottoms.json",
        "fleece.json",
        "headwear.json",
        "jackets.json",
        "sale.json",
        "tshirts.json"
    ];

    // Fetch each file, attach category & id to each item, handle errors gracefully
    const fetches = files.map(file =>
        fetch(`../data/${file}`)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${file}`);
                return res.json();
            })
            .then(dataArray => {
                const category = file.replace(".json", "");
                return dataArray.map((item, index) => ({
                    ...item,
                    category,
                    id: index
                }));
            })
            .catch(err => {
                console.error(err);
                return [];
            })
    );

    const results = await Promise.all(fetches);
    combinedData = results.flat();
}

/**
 * Performs a search on the combined data and updates the search results UI.
 * Shows a message if no results found or clears results for short queries.
 * 
 * @param {string} query - The search query string.
 */
function performSearch(query) {
    const searchResults = document.querySelector(".search-results");
    if (!searchResults) return;

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length < 3) {
        searchResults.innerHTML = "";
        return;
    }

    const filtered = combinedData.filter(item => {
        const title = item.title?.toLowerCase() || "";
        return title.includes(normalizedQuery);
    });

    if (filtered.length === 0) {
        searchResults.innerHTML = `<li class="no-results">No results found</li>`;
        return;
    }

    searchResults.innerHTML = filtered.map(item => `
        <li class="search-result-item">
            <a href="../pages/product.html?id=${item.id}&category=${item.category}" class="search-result-link">
                <img src="${item.image}" alt="${item.title}" width="50" height="50" />
                <div class="search-result-text">
                    <strong>${item.title}</strong>
                    <span>${item.price || ""}</span>
                </div>
            </a>
        </li>
    `).join("");
}