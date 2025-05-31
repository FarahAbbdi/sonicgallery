// scripts/include.js
async function includeHTML(selector, filePath) {
  const element = document.querySelector(selector);
  if (element) {
    const response = await fetch(filePath);
    if (response.ok) {
      element.innerHTML = await response.text();
    } else {
      element.innerHTML = "<!-- Component failed to load -->";
    }
  }
}

// Load shared header and footer
includeHTML("#site-header", "/components/header.html");
includeHTML("#site-footer", "/components/footer.html");
