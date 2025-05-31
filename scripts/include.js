// scripts/include.js
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