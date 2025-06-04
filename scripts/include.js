// scripts/include.js

// Loads an external HTML file into the DOM element matching `selector`.
// Dispatches a custom event 'htmlIncluded' once loaded (used for things like setting up menus).
export async function includeHTML(selector, filePath) {
    const element = document.querySelector(selector);
    if (element) {
        const response = await fetch(filePath);
        if (response.ok) {
            element.innerHTML = await response.text();
            element.dispatchEvent(new CustomEvent("htmlIncluded", { bubbles: true }));
        } else {
            element.innerHTML = "<!-- Component failed to load -->";
        }
    }
}

// Loads a product grid from a JSON file into a container by ID.
// Each product is rendered as a clickable card. Sale items get a badge and crossed-out price.
export async function loadProductGrid(containerId, jsonPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const products = await response.json();

        container.innerHTML = products.map((product, index) => {
            const category = jsonPath.split("/").pop().replace(".json", "");
            return `
                <a href="product.html?id=${index}&category=${category}" class="product-card">
                    ${product.sale ? '<div class="sale-badge">30% off</div>' : ''} 
                    <img src="${product.image}" alt="${product.title}" />
                    <div class="product-description">
                        <h2>${product.title}</h2>
                        <div class="price-block">
                            <p>
                                ${
                                    product.sale && product["old-price"]
                                        ? `<span class="old-price">${product["old-price"]}</span> <span class="new-price">${product.price}</span>`
                                        : `${product.price}`
                                }
                            </p>
                        </div>
                    </div>
                </a>
            `;
        }).join("");
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load products.</p>";
    }
}
