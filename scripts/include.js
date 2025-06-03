// scripts/include.js

// TODO: ADD COMMENT HERE
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

// Load external JSON into a product grid container
export async function loadProductGrid(containerId, jsonPath) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const products = await response.json();

        container.innerHTML = products.map(product => `
            <a href="${product.link}" class="product-card">
                <img src="${product.image}" alt="${product.title}" />
                <div class="product-description">
                    <h2>${product.title}</h2>
                    <p>${product.price}</p>
                </div>
            </a>
        `).join("");
    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Failed to load products.</p>";
    }
}