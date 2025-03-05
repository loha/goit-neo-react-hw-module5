import { lazy, useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../fetch-api";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleTrendingMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchTrendingMovies();
        setTrendingMovies(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    handleTrendingMovies();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Trending</h1>
      <MovieList movies={trendingMovies} />
    </div>
  );
}

export default HomePage;
