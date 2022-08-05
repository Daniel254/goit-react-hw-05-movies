import { getMovieCast } from 'api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Cast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId).then(setMovieCast);
  }, [movieId]);

  if (!movieCast) {
    return null;
  }
  return (
    <ul>
      {movieCast.slice(0, 20).map(item => (
        <li key={item.id}>
          {item.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${item.profile_path}`}
              alt={item.name}
            />
          )}
          <br />
          <span>{item.name}</span>
          <br />
          <span>Character: {item.character}</span>
        </li>
      ))}
    </ul>
  );
}

export default Cast;
