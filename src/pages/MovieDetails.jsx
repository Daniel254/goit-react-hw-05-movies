import { getMovieDetails } from 'api/tmdbApi';
import { TMDB_IMAGE_BASE_URL } from 'constants/tmdb';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(error => setError(error.message));
  }, [movieId]);

  if (!movie) {
    return error && <h1>{error}</h1>;
  }

  const { title, vote_average, overview, genres, poster_path } = movie;
  return (
    <>
      <p>
        <Link to={location.state?.from ?? '/movies'}>
          {location.state ? '← Go back' : 'Go movie search'}
        </Link>
      </p>
      <img
        src={`${TMDB_IMAGE_BASE_URL}w200${poster_path}`}
        alt={title}
        style={{ float: 'left' }}
      />
      <h1>{title}</h1>
      <p>User Score: {Math.round(vote_average * 10)}%</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h3>Genres</h3>
      <p>
        {genres.reduce(
          (genresString, item) => genresString + item.name + ' ',
          ''
        )}
      </p>
      <hr />
      <span>Additional information</span>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <hr />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
