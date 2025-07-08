# 🛍️ Sonic's Gallery – Website Redesign

This project is a complete **redesign and implementation** of the Sonic’s Gallery e-commerce website. The focus was on improving the **user experience** across critical pages: Home, Search, Product View, Cart, Checkout, and Purchase Confirmation.

- 🎨 A **Figma prototype** redesign key customer journey pages
- 💻 A **static HTML/CSS/JavaScript implementation** based on the prototype.

🔗 [Live Prototype (Figma)](https://XXXXXXX.com)  
🔗 [Live Site](sonicgallery.vercel.app)

---

## 📚 Table of Contents

- [Features](#features)
- [Page Comparisons](#page-comparisons)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Disclaimer](#disclaimer)
- [Credits](#credits)
- 
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

---

## 🛠 Tech Stack

- **HTML5** – Semantic structure  
- **CSS3** – Responsive layout with reusable modules  
- **JavaScript (Vanilla)** – Component loading, search, cart logic  
- **JSON** – Product data handling  
- **Vercel** – Hosting (live deployment

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

## 🌟 Credits & Acknowledgments

- **Design & Development:** Farah  
- **Course:** INFO20005 – User Interface Design
