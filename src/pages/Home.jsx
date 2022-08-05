import { getTrendingMovies } from 'api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Home() {
  const [trendingMovieList, setTrendingMovieList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendingMovies().then(setTrendingMovieList);
  }, [setTrendingMovieList]);

  return (
    <>
      <h1>Trending list</h1>
      <ul>
        {trendingMovieList.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
