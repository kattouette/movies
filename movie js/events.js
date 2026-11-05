import { movies } from "./movies.js";

import {
    container,
    addInput,
    yearInput,
    searchInput,
    clearButton,
    form,
    genreSelect,
    watchedCheckbox,
    nameError,
    yearError,
    themeButton
} from "./dom.js";

import {
    generateId,
    formatTitle,
    formatYear
} from "./helpers.js";

import {
    validateTitle,
    validateYear
} from "./validation.js";

import {
    renderMovie,
    renderMovies,
    displayMoviesQuantity
} from "./render.js";

import { toggleTheme } from "./styles.js";

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let title = formatTitle(addInput.value);
    let year = yearInput.value;

    nameError.textContent = "";
    yearError.textContent = "";

    if (!validateTitle(title)) {
        nameError.textContent = "Enter movie title";
        return;
    }

    if (!validateYear(year)) {
        yearError.textContent = "Enter correct year";
        return;
    }

    let movie = {
        id: generateId(),
        title: title,
        year: formatYear(year),
        genre: genreSelect.value,
        watched: watchedCheckbox.checked,
        description: ""
    };

    movies.push(movie);
    renderMovie(movie);
    displayMoviesQuantity();
    form.reset();
});


container.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
        const li = event.target.closest("li");
        const id = Number(li.dataset.id);

        const index = movies.findIndex(function (movie) {
            return movie.id === id;
        });

        if (index !== -1) {
            movies.splice(index, 1);
        }
        li.remove();
        displayMoviesQuantity();
    }
});


function searchMovies() {
    const searchValue = searchInput.value.toLowerCase();

    const filteredMovies = movies.filter(function (movie) {
        return movie.title.toLowerCase().includes(searchValue);
    });
    renderMovies(filteredMovies);
}
searchInput.addEventListener("input", searchMovies);

themeButton.addEventListener("click", toggleTheme);


clearButton.addEventListener("click", function () {
    movies.length = 0;
    container.innerHTML = "";
    displayMoviesQuantity();
});


document.addEventListener("keydown", function (event) {
    if (
        event.key.toLowerCase() === "d" &&
        !event.target.closest("input, textarea")
    ) {
        toggleTheme();
    }
});