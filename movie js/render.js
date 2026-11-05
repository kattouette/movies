import { movies } from "./movies.js";
import { container, title } from "./dom.js";
import { createElement } from "./helpers.js";
import { applyCardStyles, markWatched } from "./styles.js";

function createMovieCard(movie) {
    const li = createElement(
        "li",
        "movie-list-item",
        `${movie.title} (${movie.year}) (${movie.genre})`
    );
    li.classList.toggle("watched", movie.watched);
    li.dataset.id = movie.id;
    applyCardStyles(li);
    li.addEventListener("click", function (event) {
        if (event.target.closest("button, a")) {
            return;
        }
        movie.watched = !movie.watched;
        markWatched(li);
        displayMoviesQuantity();
    });
    return li;
}

function createDeleteButton() {
    return createElement("button", "delete-button", "X");
}

function createLink(movie, li) {
    const link = createElement("a", "", "Детальніше");

    link.href = "#";

    link.addEventListener("click", function (event) {
        showMovieDetails(event, movie, li);
    });

    return link;
}

export function renderMovie(movie) {
    const li = createMovieCard(movie);
    const deleteButton = createDeleteButton();
    const link = createLink(movie, li);
    li.appendChild(deleteButton);
    li.appendChild(link);
    container.appendChild(li);
}

export function renderMovies(movieList) {
    container.innerHTML = "";
    movieList.forEach(function (movie) {
        renderMovie(movie);
    });
}

export function showMovieDetails(event, movie, li) {
    event.preventDefault();
    event.stopPropagation();

    if (li.querySelector("p")) {
        return;
    }
    const info = document.createElement("p");
    info.textContent = movie.description;

    li.appendChild(info);
}

export function displayMoviesQuantity() {
    const watchedMovies = movies.filter(function (movie) {
        return movie.watched;
    });

    title.textContent = `Watched: ${watchedMovies.length} of ${movies.length}`;
}