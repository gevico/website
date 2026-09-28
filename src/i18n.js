// Chinese copy lives in index.html; English translations follow the same sections.
const translations = [
    [".skip-link", "Skip to content"],
    ['[data-copy="qq"]', "QQ Group"],
    ['[data-copy="telegram"]', "Telegram"],
    ['[data-copy="bilibili"]', "Bilibili"],
    ['[data-copy="wechat"]', "WeChat"],
    ['[data-copy="blog"]', "Blog"],
    ["h1", "Gevico Tech<br /><span>Open Community</span>"],
    [
        ".hero-motto",
        'Explore the fundamentals.<br class="english-break" /> <span>Innovate across dimensions.</span>',
    ],
    [
        ".hero-description",
        "Go deeper into systems. Build together in the open.<br />GTOC is an open community for foundational systems software.",
    ],
    ['[data-copy="github-action"]', "Contribute to our projects"],
    ['[data-copy="blog-action"]', "Read our blog"],
    [".footer-motto", "STAY CURIOUS · KEEP BUILDING"],
];

const textNodes = translations.flatMap(([selector, en]) =>
    [...document.querySelectorAll(selector)].map((element) => ({
        element,
        zh: element.innerHTML,
        en,
    })),
);
const attributeNodes = [
    [".brand", "aria-label", "GTOC home"],
    ["#navigation", "aria-label", "Community links"],
    [
        'meta[name="description"]',
        "content",
        "Gevico Tech Open Community (GTOC). Explore the fundamentals. Innovate across dimensions. An open community for foundational systems software.",
    ],
].map(([selector, attribute, en]) => {
    const element = document.querySelector(selector);
    return { element, attribute, zh: element.getAttribute(attribute), en };
});
const chineseTitle = document.title;
const switcher = document.querySelector(".language-switch");
const storageKey = "gevico-language";

function languageFromUrl() {
    const requested = new URL(window.location.href).searchParams.get("lang");
    return requested === "en" || requested === "zh" ? requested : null;
}
function savedLanguage() {
    try {
        return localStorage.getItem(storageKey) === "en" ? "en" : "zh";
    } catch {
        return "zh";
    }
}
export function menuLabel(open) {
    return document.documentElement.lang === "en"
        ? open
            ? "Close navigation"
            : "Open navigation"
        : open
          ? "关闭导航"
          : "打开导航";
}
function applyLanguage(language) {
    document.documentElement.lang = language === "en" ? "en" : "zh-CN";
    textNodes.forEach(({ element, ...copy }) => {
        element.innerHTML = copy[language];
    });
    attributeNodes.forEach(({ element, attribute, ...copy }) => {
        element.setAttribute(attribute, copy[language]);
    });
    document.title =
        language === "en" ? "GTOC · Gevico Tech Open Community" : chineseTitle;
    switcher.innerHTML = `${language === "en" ? "中文" : "EN"} <span aria-hidden="true">↗</span>`;
    switcher.lang = language === "en" ? "zh-CN" : "en";
    switcher.setAttribute(
        "aria-label",
        language === "en" ? "切换到中文" : "Switch to English",
    );
    const menu = document.querySelector(".menu-toggle");
    menu.setAttribute(
        "aria-label",
        menuLabel(menu.getAttribute("aria-expanded") === "true"),
    );
    try {
        localStorage.setItem(storageKey, language);
    } catch {
        // Language switching also works when storage is unavailable.
    }
}

switcher.addEventListener("click", () => {
    const language = document.documentElement.lang === "en" ? "zh" : "en";
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.pushState(null, "", url);
    applyLanguage(language);
});
window.addEventListener("popstate", () =>
    applyLanguage(languageFromUrl() || "zh"),
);
const initialLanguage = languageFromUrl() || savedLanguage();
if (!languageFromUrl()) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", initialLanguage);
    window.history.replaceState(null, "", url);
}
applyLanguage(initialLanguage);
