
import { useState, useEffect } from "react";
import {
  Search,
  Heart,
  Film,
  ArrowLeft,
} from "lucide-react";
import { searchMovies } from "./services/movieService";
import "./App.css";

const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
    rating: "8.8/10",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into someone's mind.",
    poster: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    year: "2014",
    genre: "Adventure",
    rating: "8.7/10",
    description:
      "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: "2008",
    genre: "Action",
    rating: "9.0/10",
    description:
      "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into chaos.",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 4,
    title: "Avatar",
    year: "2009",
    genre: "Fantasy",
    rating: "7.9/10",
    description:
      "A marine travels to Pandora and becomes involved in the conflict between humans and the Na'vi.",
    poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  },
  {
    id: 5,
    title: "Joker",
    year: "2019",
    genre: "Drama",
    rating: "8.4/10",
    description:
      "A struggling comedian begins a journey into madness and becomes Gotham's infamous Joker.",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    year: "2019",
    genre: "Action",
    rating: "8.4/10",
    description:
      "The Avengers assemble once more to reverse the damage caused by Thanos.",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [apiMovies, setApiMovies] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("movieFavorites");
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem(
      "movieFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  async function handleSearch(event) {
    event.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);
    setShowFavorites(false);
    setSelectedMovie(null);

    try {
      const results = await searchMovies(search);
      setApiMovies(results);

      if (results.length === 0) {
        setError("No movies found. Try another search.");
      }
    } catch (err) {
      setApiMovies([]);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(movie) {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (item) => item.id === movie.id
      );

      if (alreadyFavorite) {
        return previousFavorites.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...previousFavorites, movie];
    });
  }

  const displayedMovies = showFavorites
    ? favorites
    : hasSearched
      ? apiMovies
      : sampleMovies;

  function openHome() {
    setSelectedMovie(null);
    setShowFavorites(false);
  }

  function openFavorites() {
    setSelectedMovie(null);
    setShowFavorites(true);
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <Film size={28} />
          <h2>MovieHub</h2>
        </div>

        <nav>
          <button onClick={openHome}>Home</button>

          <button onClick={openFavorites}>
            <Heart size={17} />
            My Favorites ({favorites.length})
          </button>
        </nav>
      </header>

      {selectedMovie ? (
        <main className="details-page">
          <button className="back-button" onClick={() => setSelectedMovie(null)}>
            <ArrowLeft size={18} />
            Back to movies
          </button>

          <div className="movie-details">
            <div className="details-poster">
              {selectedMovie.poster ? (
                <img
                  src={selectedMovie.poster}
                  alt={selectedMovie.title}
                />
              ) : (
                <div className="poster-placeholder">
                  No poster available
                </div>
              )}
            </div>

            <div className="details-content">
              <h1>{selectedMovie.title}</h1>
              <p>{selectedMovie.year} · {selectedMovie.genre}</p>
              <h3>⭐ {selectedMovie.rating}</h3>
              <h3>Overview</h3>
              <p>{selectedMovie.description}</p>

              <button
                className="favorite-button"
                onClick={() => toggleFavorite(selectedMovie)}
              >
                <Heart
                  size={18}
                  fill={
                    favorites.some(
                      (item) => item.id === selectedMovie.id
                    )
                      ? "currentColor"
                      : "none"
                  }
                />
                {favorites.some(
                  (item) => item.id === selectedMovie.id
                )
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <section className="hero">
            <h1>Discover Your Next Favorite Movie</h1>
            <p>Search, explore and save the movies you love.</p>

            <form className="search-box" onSubmit={handleSearch}>
              <Search size={20} />

              <input
                type="text"
                placeholder="Search for a movie..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </section>

          <section className="movies-section">
            <h2>
              {showFavorites
                ? "My Favorite Movies"
                : hasSearched
                  ? "Search Results"
                  : "Popular Movies"}
            </h2>

            {loading && <p className="message">Searching movies...</p>}

            {error && !loading && (
              <p className="message">{error}</p>
            )}

            {!loading && displayedMovies.length > 0 && (
              <div className="movie-grid">
                {displayedMovies.map((movie) => {
                  const isFavorite = favorites.some(
                    (item) => item.id === movie.id
                  );

                  return (
                    <article className="movie-card" key={movie.id}>
                      <div
                        className="poster"
                        onClick={() => setSelectedMovie(movie)}
                      >
                        {movie.poster ? (
                          <img
                            src={movie.poster}
                            alt={movie.title}
                          />
                        ) : (
                          <div className="poster-placeholder">
                            No poster available
                          </div>
                        )}
                      </div>

                      <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <p>
                          {movie.year} · {movie.genre}
                        </p>
                        <p>⭐ {movie.rating}</p>

                        <div className="card-actions">
                          <button
                            onClick={() => setSelectedMovie(movie)}
                          >
                            View Details
                          </button>

                          <button
                            className="heart-button"
                            onClick={() => toggleFavorite(movie)}
                            aria-label={
                              isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                          >
                            <Heart
                              size={20}
                              fill={isFavorite ? "currentColor" : "none"}
                            />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {!loading &&
              showFavorites &&
              favorites.length === 0 && (
                <p className="message">
                  You haven't added any favorite movies yet.
                </p>
              )}
          </section>
        </main>
      )}

      <footer>
        <p>© 2026 MovieHub. Discover movies you love.</p>
      </footer>
    </div>
  );
}

export default App;
