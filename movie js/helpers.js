export function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;

    return element;
}

export function generateId() {
    return new Date().getTime();
}

export function formatTitle(title) {
    return title.trim();
}

export function formatYear(year) {
    return Number(year);
}