export function applyCardStyles(card) {
    card.style.padding = "15px";
    card.style.borderRadius = "10px";
}

export function toggleTheme() {
    document.body.classList.toggle("dark");
}

export function markWatched(card) {
    card.classList.toggle("watched");
}