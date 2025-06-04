// search.js

let combinedData = [];

export function setupSearchOverlay() {
    const searchButton = document.querySelector(".btn-search");
    const cancelButton = document.querySelector(".cancel-search");
    const searchOverlay = document.querySelector(".search-overlay");
    const overlay = document.querySelector(".overlay");
    const body = document.body;
    const searchInput = document.querySelector(".search-overlay input[type='search']");
    const searchResults = document.querySelector(".search-results");

    if (!searchButton || !cancelButton || !searchOverlay || !overlay || !searchInput || !searchResults) return;

    function openSearch() {
        searchOverlay.classList.add("open");
        overlay.classList.add("show");
        body.classList.add("body-lock");
    }

    function closeSearch() {
        searchOverlay.classList.remove("open");
        overlay.classList.remove("show");
        body.classList.remove("body-lock");
        searchInput.value = "";
        searchResults.innerHTML = "";
    }

    // Toggle open/close on icon click
    searchButton.addEventListener("click", () => {
        const isOpen = searchOverlay.classList.toggle("open");
        searchButton.setAttribute("aria-expanded", isOpen.toString());

        if (isOpen) {
            overlay.classList.add("show");
            body.classList.add("body-lock");
        } else {
            closeSearch();
        }
    });

    // Cancel button
    cancelButton.addEventListener("click", closeSearch);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && searchOverlay.classList.contains("open")) {
            closeSearch();
        }
    });

    // Close on clicking overlay (only if search overlay is open and dropdown isn't)
    overlay.addEventListener("click", () => {
        const isSearchOpen = searchOverlay.classList.contains("open");
        const isDropdownOpen = document.querySelector(".dropdown-nav")?.classList.contains("open");

        if (isSearchOpen && !isDropdownOpen) closeSearch();
    });

    // Perform search when typing
    searchInput.addEventListener("input", () => {
        performSearch(searchInput.value);
    });

    // Resize listener to maintain overlay and body-lock state ---
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

// Load all JSON files from data folder, combine into one array for searching
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

    const fetches = files.map(file =>
        fetch(`../data/${file}`)  // ⬅️ go up one level from scripts/
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${file}`);
                return res.json();
            })
            .catch(err => {
                console.error(err);
                return [];
            })
    );

    const results = await Promise.all(fetches);
    combinedData = results.flat(); // flatten arrays into one
}

// Perform search and show results
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

    searchResults.innerHTML = filtered.map(item => `
        <li tabindex="0" role="option" class="search-result-item">
            <img src="${item.image}" alt="${item.title}" width="50" height="50" />
            <div class="search-result-text">
                <strong>${item.title}</strong><br/>
                <span>${item.price || ""}</span>
            </div>
        </li>
    `).join("");

    if (filtered.length === 0) {
        searchResults.innerHTML = `<li class="no-results">No results found</li>`;
        return;
    }
}