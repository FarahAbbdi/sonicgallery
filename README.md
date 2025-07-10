# 🛍️ Sonic's Gallery – Website Redesign

This project is a complete **redesign and implementation** of the Sonic’s Gallery e-commerce website. The focus was on improving the **user experience** across critical pages: Home, Search, Product View, Cart, Checkout, and Purchase Confirmation.

- 🎨 A **Figma prototype** redesign key customer journey pages
- 💻 A **static HTML/CSS/JavaScript implementation** based on the prototype.

🔗 [Live Prototype Website (Figma)](https://www.figma.com/design/PmMLRoOLSrrUkKUcBj3qMq/INFO20003-A2---Webpage-Prototype?node-id=1-2&p=f&t=dCwRE4ABEs0J3CMq-0)  
🔗 [Live Prototype Mobile (Figma)](https://www.figma.com/design/9w2FMAjQW8cQMhCgFp82Sr/INFO20003-A2---Mobile-Prototype?t=dCwRE4ABEs0J3CMq-0)
🔗 [Live Site](https://sonicgallery.vercel.app)

---

## 📚 Table of Contents

- [Features](#-features)
- [Page Comparisons](#-page-comparisons)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Disclaimer](#-disclaimer)
- [Credits](#-credits)
  
---

## ✨ Features

- Modern, mobile-friendly UI
- Modular, reusable HTML components (`header`, `footer`, `product grid`)
- Search functionality with live filtering
- Shopping cart with persistent state (localStorage)
- Clean, responsive layout built from scratch
- Fully working purchase flow (from search to confirmation)

---

## 🖼 Page Comparisons

Each of the following pages was redesigned for improved usability, layout clarity, and mobile responsiveness.

### 🏠 Home Page

| Before | After |
|--------|-------|
| ![Home Before](readme-assets/old-landing-page.png) | ![Home After](readme-assets/new-landing-page.png) |

---

### 🔎 Search Results

| Before | After |
|--------|-------|
| ![Search Before](readme-assets/old-search-bar.png) | ![Search After](readme-assets/new-search-bar.png) |

---

### 📄 Product Page

| Before | After |
|--------|-------|
| ![Product Before](readme-assets/old-product-page.png) | ![Product After](readme-assets/new-product-page.png) |

---

### 🛍 All Products Page

| Before | After |
|--------|-------|
| ![Products Before](readme-assets/old-products-page.png) | ![Products After](readme-assets/new-products-page.png) |

---

### 🛒 Cart Page

| Before | After |
|--------|-------|
| ![Cart Before](readme-assets/old-cart-page.png) | ![Cart After](readme-assets/new-cart-page.png) |

---

### 💳 Checkout & Confirmation

| Before | After |
|--------|-------|
| ![Checkout Before](readme-assets/old-checkout-page.png) | ![Checkout After](readme-assets/new-checkout-page.png) |

---

## 🛠 Tech Stack

- **HTML5** – Semantic structure  
- **CSS3** – Responsive layout with reusable modules  
- **JavaScript (Vanilla)** – Component loading, search, cart logic  
- **JSON** – Product data handling  
- **Vercel** – Hosting (live deployment)

---

## 📁 Project Structure

```
sonicsgallery/
├── assets/
│   ├── icons/              # All icon files used site-wide (e.g., SVGs)
│   └── images/             # All images for products, backgrounds, and visuals
│
├── components/
│   ├── footer.html         # Reusable footer
│   ├── header.html         # Reusable header/navigation
│   └── product-grid.html   # Reusable product grid layout
│
├── data/
│   ├── accessories.json
│   ├── bottoms.json
│   ├── fleece.json
│   ├── headwear.json
│   ├── jackets.json
│   ├── sale.json
│   ├── tshirts.json
│   └── shop-all.json       # All products combined
│
├── pages/
│   ├── accessories.html
│   ├── bottoms.html
│   ├── checkout.html
│   ├── confirmation.html
│   ├── fleece.html
│   ├── headwear.html
│   ├── jackets.html
│   ├── product.html
│   ├── sale.html
│   ├── shop-all.html
│   └── tshirts.html
│
├── scripts/
│   ├── main.js             # Loads shared components and initializes features
│   ├── include.js          # Loads external HTML and displays product grids
│   ├── header.js           # Handles dropdown menu and sidebar navigation
│   ├── product-details.js  # Handles individual product logic and cart actions
│   ├── cart.js             # Manages cart items, storage, and checkout display
│   └── search.js           # Manages search overlay and live result filtering
│
├── styles/
│   ├── checkout.css
│   ├── confirmation.css
│   ├── footer.css
│   ├── header.css
│   ├── homepage.css
│   ├── main.css
│   ├── product-grid.css
│   └── product.css
│
├── .gitignore              # Files/folders excluded from version control
├── index.html              # Main landing page
└── README.md
```

---

## ⚠️ Disclaimer

This project was created for educational purposes as part of a UX/UI design and development coursework.
Sonic’s Gallery and all original branding and content belong to their respective owners.
I am not affiliated with Sonic’s Gallery — this is a non-commercial redesign intended for learning.

---

## 🌟 Credits

- **Design & Development:** Farah  
- **Course:** INFO20005 – User Interface Design