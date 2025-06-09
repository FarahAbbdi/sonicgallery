/**
 * Loads an external HTML file into the DOM element matching the selector.
 * Dispatches a custom 'htmlIncluded' event on the element once loaded.
 * 
 * @param {string} selector - CSS selector of the element to inject HTML into.
 * @param {string} filePath - Path to the external HTML file.
 */
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

/**
 * Loads a product grid from a JSON file and injects it into a container element by ID.
 * Renders clickable product cards with sale badges and old/new prices where applicable.
 * 
 * @param {string} containerId - ID of the container element where products will be rendered.
 * @param {string} jsonPath - Path to the JSON file containing product data.
 */
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
                                        : product.price
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