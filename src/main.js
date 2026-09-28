import "./style.css";
import { menuLabel } from "./i18n.js";

const githubIcon =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.77-.24.77-.54v-2.09c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.15 1.72 1.15 1 1.71 2.62 1.22 3.26.94.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.15-3.02-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.69.11 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg>';
document.querySelectorAll('[data-icon="github"]').forEach((element) => {
    element.innerHTML = githubIcon;
});

const lineIcons = {
    send: '<path d="m21 3-7 18-4-8-8-4 19-6ZM10 13 21 3"/>',
    video: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="m7 2 3 4M17 2l-3 4M8 11v4M16 11v4"/>',
    book: '<path d="M4 4h6c2 0 2 2 2 2s0-2 2-2h6v15h-6c-2 0-2 1-2 1s0-1-2-1H4zM12 6v14"/>',
    chat: '<path d="M20 11a8 8 0 0 1-8 8H5l-3 3v-8a8 8 0 1 1 18-3Z"/><path d="M7 10h9M7 14h5"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v2"/>',
};
for (const [name, paths] of Object.entries(lineIcons)) {
    document
        .querySelectorAll('[data-icon="' + name + '"]')
        .forEach((element) => {
            element.innerHTML =
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
                paths +
                "</svg>";
        });
}

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", menuLabel(false));
    navigation.classList.remove("open");
}
menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", menuLabel(open));
    navigation.classList.toggle("open", open);
});
navigation
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        menu.getAttribute("aria-expanded") === "true"
    ) {
        closeMenu();
        menu.focus();
    }
});
document.querySelector("#year").textContent = new Date().getFullYear();
