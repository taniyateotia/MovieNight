// ================= MOVIE DATA =================

const movies = [

    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        rating: 8.8,
        image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
        description:
            "A skilled thief enters the dreams of others to steal secrets and attempts an impossible mission."
    },

    {
        id: 2,
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 8.7,
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        description:
            "A group of astronauts travels through a wormhole in search of a new home for humanity."
    },

    {
        id: 3,
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        description:
            "Batman faces a dangerous criminal mastermind who wants to push Gotham into chaos."
    },

    {
        id: 4,
        title: "Avengers: Endgame",
        genre: "Action",
        rating: 8.4,
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        description:
            "The Avengers attempt to undo the devastating events caused by Thanos."
    },

    {
        id: 5,
        title: "Toy Story",
        genre: "Animation",
        rating: 8.3,
        image: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
        description:
            "A group of toys comes to life whenever humans are not around."
    },

    {
        id: 6,
        title: "The Hangover",
        genre: "Comedy",
        rating: 7.7,
        image: "https://image.tmdb.org/t/p/w500/uluhlXubGu1VxU63X9VHCLWDAYP.jpg",
        description:
            "Three friends wake up after a crazy night and try to figure out what happened."
    }

];


// ================= VARIABLES =================

let watchlist = [];

let currentMovie = null;


// ================= DISPLAY MOVIES =================

function displayMovies(movieList) {

    const container =
        document.getElementById("movieContainer");

    container.innerHTML = "";


    // If no movies found
    if (movieList.length === 0) {

        container.innerHTML = `
            <p style="
                text-align: center;
                grid-column: 1 / -1;
                color: #999;
                font-size: 20px;
            ">
                😭 No movies found.
            </p>
        `;

        return;
    }


    // Create movie cards
    movieList.forEach(movie => {

        const card = document.createElement("div");

        card.className = "movie-card";


        card.innerHTML = `

            <img
                src="${movie.image}"
                alt="${movie.title}"
            >

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p class="genre">
                    🎭 ${movie.genre}
                </p>

                <p class="rating">
                    ⭐ ${movie.rating}/10
                </p>

                <p class="movie-description">
                    ${movie.description}
                </p>

                <div class="card-buttons">

                    <button
                        class="details-btn"
                        onclick="openModal(${movie.id})">
                        Details
                    </button>

                    <button
                        class="favourite-btn"
                        onclick="toggleWatchlist(${movie.id})">
                        ❤️
                    </button>

                </div>

            </div>
        `;


        container.appendChild(card);

    });

}


// ================= SEARCH + FILTER =================

function filterMovies() {

    const searchText =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const selectedGenre =
        document
            .getElementById("genreFilter")
            .value;


    let filteredMovies = movies.filter(movie => {

        const matchesSearch =
            movie.title
                .toLowerCase()
                .includes(searchText);


        const matchesGenre =
            selectedGenre === "all" ||
            movie.genre === selectedGenre;


        return matchesSearch && matchesGenre;

    });


    sortMovieList(filteredMovies);

}


// ================= SORT MOVIES =================

function sortMovieList(movieList) {

    const sortValue =
        document.getElementById("sortMovies").value;


    // Highest rating first
    if (sortValue === "high") {

        movieList.sort(
            (a, b) => b.rating - a.rating
        );

    }


    // Lowest rating first
    if (sortValue === "low") {

        movieList.sort(
            (a, b) => a.rating - b.rating
        );

    }


    displayMovies(movieList);

}


// ================= SEARCH EVENT =================

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        filterMovies
    );


// ================= GENRE FILTER EVENT =================

document
    .getElementById("genreFilter")
    .addEventListener(
        "change",
        filterMovies
    );


// ================= SORT EVENT =================

document
    .getElementById("sortMovies")
    .addEventListener(
        "change",
        filterMovies
    );


// ================= OPEN MOVIE MODAL =================

function openModal(movieId) {

    const movie =
        movies.find(
            movie => movie.id === movieId
        );


    currentMovie = movie;


    // Set image
    document.getElementById("modalImage").src =
        movie.image;


    // Set title
    document.getElementById("modalTitle").textContent =
        movie.title;


    // Set genre
    document.getElementById("modalGenre").textContent =
        "🎭 Genre: " + movie.genre;


    // Set rating
    document.getElementById("modalRating").textContent =
        "⭐ Rating: " + movie.rating + "/10";


    // Set description
    document.getElementById("modalDescription").textContent =
        movie.description;


    // Update button
    updateModalButton();


    // Show modal
    document
        .getElementById("movieModal")
        .classList.add("active");

}


// ================= CLOSE MOVIE MODAL =================

function closeModal() {

    document
        .getElementById("movieModal")
        .classList.remove("active");

}


// ================= CLOSE MODAL WHEN CLICKING OUTSIDE =================

document
    .getElementById("movieModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


// ================= WATCHLIST =================

function toggleWatchlist(movieId) {

    const movie =
        movies.find(
            movie => movie.id === movieId
        );


    // Check if movie is already in watchlist
    const alreadyAdded =
        watchlist.some(
            item => item.id === movieId
        );


    if (alreadyAdded) {

        // Remove movie
        watchlist =
            watchlist.filter(
                item => item.id !== movieId
            );

    }

    else {

        // Add movie
        watchlist.push(movie);

    }


    // Update watchlist
    displayWatchlist();


    // Update modal button
    updateModalButton();

}


// ================= DISPLAY WATCHLIST =================

function displayWatchlist() {

    const container =
        document.getElementById(
            "watchlistContainer"
        );


    container.innerHTML = "";


    // If watchlist is empty
    if (watchlist.length === 0) {

        container.innerHTML = `
            <p class="empty-message">
                Your watchlist is empty. 🍿
            </p>
        `;

        return;
    }


    // Create watchlist cards
    watchlist.forEach(movie => {

        const card =
            document.createElement("div");


        card.className = "watch-card";


        card.innerHTML = `

            <img
                src="${movie.image}"
                alt="${movie.title}"
            >

            <h3>
                ${movie.title}
            </h3>

            <p>
                ⭐ ${movie.rating}
            </p>

            <button
                class="remove-btn"
                onclick="toggleWatchlist(${movie.id})">

                Remove

            </button>

        `;


        container.appendChild(card);

    });

}


// ================= MODAL WATCHLIST BUTTON =================

document
    .getElementById("modalWatchlistBtn")
    .addEventListener("click", function() {

        if (currentMovie) {

            toggleWatchlist(
                currentMovie.id
            );

        }

    });


// ================= UPDATE MODAL BUTTON =================

function updateModalButton() {

    if (!currentMovie) {

        return;

    }


    const button =
        document.getElementById(
            "modalWatchlistBtn"
        );


    const exists =
        watchlist.some(
            movie =>
                movie.id === currentMovie.id
        );


    if (exists) {

        button.textContent =
            "💔 Remove from Watchlist";

    }

    else {

        button.textContent =
            "❤️ Add to Watchlist";

    }

}


// ================= DARK MODE =================

const darkModeBtn =
    document.getElementById(
        "darkModeBtn"
    );


darkModeBtn.addEventListener(
    "click",
    function() {

        // Toggle light mode
        document.body.classList.toggle(
            "light"
        );


        // Change button icon
        if (
            document.body.classList.contains(
                "light"
            )
        ) {

            darkModeBtn.textContent = "☀️";

        }

        else {

            darkModeBtn.textContent = "🌙";

        }

    }
);


// ================= SCROLL TO MOVIES =================

function scrollToMovies() {

    document
        .getElementById("movies")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= INITIAL LOAD =================

// Display all movies when website opens

displayMovies(movies);


// Display empty watchlist

displayWatchlist();