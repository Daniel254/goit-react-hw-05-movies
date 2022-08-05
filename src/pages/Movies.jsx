import { getMoviesByQuery } from 'api/tmdbApi';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q');
  const location = useLocation();

  // const params = useMemo(
  //   () => Object.fromEntries([...searchParams]),
  //   [searchParams]
  // );
  useEffect(() => {
    if (!q) {
      return;
    }
    getMoviesByQuery(q)
      .then(setMovies)
      .catch(error => setError(error.message));
  }, [q]);

  const formik = useFormik({
    initialValues: {
      q: q ?? '',
    },
    onSubmit: ({ q }) => {
      if (q) {
        setSearchParams({ q });
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="q"
          autoFocus
          autoComplete="off"
          value={formik.values.q}
          onChange={formik.handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {movies?.length ? (
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={String(id)} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
}
