
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(searchTerm) {
  if (!searchTerm.trim()) {
    return [];
  }

  if (!ACCESS_TOKEN || ACCESS_TOKEN === "your_tmdb_token_here") {
    throw new Error("Please add your TMDB access token to the .env file.");
  }

  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to connect to TMDB. Please try again.");
  }

  const data = await response.json();

  return (data.results || []).map((movie) => ({
    id: movie.id,
    title: movie.title,
    year: movie.release_date
      ? movie.release_date.slice(0, 4)
      : "Unknown",
    genre: "Movie",
    rating: movie.vote_average
      ? `${movie.vote_average.toFixed(1)}/10`
      : "Not rated",
    description: movie.overview || "No description available.",
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "",
  }));
}
