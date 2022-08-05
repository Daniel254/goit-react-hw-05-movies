import { getMovieReviews } from 'api/tmdbApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    getMovieReviews(movieId).then(setMovieReviews);
  }, [movieId]);
  if (!movieReviews) {
    return null;
  }
  return movieReviews.length ? (
    <ul>
      {movieReviews.map(review => (
        <li key={review.id}>
          <h3>{review.author}</h3>
          <p key={review.id}>{review.content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <span>We don't have any reviews for this movie.</span>
  );
}

export default Reviews;
