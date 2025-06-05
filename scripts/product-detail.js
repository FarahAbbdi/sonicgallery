// product-detail.js

import { addToCart } from "/scripts/cart.js";

// Load product detail into the container, using URL params "id" and "category"
export async function loadProductDetail(containerId = "product-detail-container") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const category = params.get("category");

  if (!productId || !category) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(`/data/${category}.json`);
    if (!response.ok) throw new Error("Failed to fetch product data");
    const products = await response.json();
    const product = products[productId];

    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }

    container.innerHTML = `
      <div class="product-detail">
        <div class="product-images">
          <div class="thumbnail-images">
            <img src="${product.image}" alt="${product.title}" />
              ${product.image2 ? `<img src="${product.image2}" alt="${product.title} alternate 1" />` : ""}
              ${product.image3 ? `<img src="${product.image3}" alt="${product.title} alternate 2" />` : ""}
           </div>
        </div>
        <div class="product-info">
          <h1>${product.title}</h1>
          <p class="price">${product.price}</p>
          <button class="add-to-cart">ADD TO BAG</button>
        </div>
      </div>
    `;

    // Add-to-Cart logic after rendering
    const addToCartBtn = container.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
      document.querySelector(".btn-cart")?.click();
    });
    
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Failed to load product details.</p>";
  }

}