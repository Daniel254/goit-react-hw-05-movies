import axios from 'axios';

import { TMDB_API_BASE_URL, TMDB_API_KEY } from 'constants/tmdb';

const axiosInstance = axios.create({
  baseURL: TMDB_API_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('trending/movie/week');
  const trendingMovies = response.data.results;
  return trendingMovies;
};

export const getMovieDetails = async id => {
  const response = await axiosInstance.get(`movie/${id}`);
  return response.data;
};

export const getMovieCast = async id => {
  const response = await axiosInstance.get(`movie/${id}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async id => {
  const response = await axiosInstance.get(`movie/${id}/reviews`);
  return response.data.results;
};

export const getMoviesByQuery = async query => {
  const response = await axiosInstance.get('/search/movie', {
    params: { query },
  });
  if (response.data.total_results === 0) {
    throw new Error('Movies not found');
  }
  return response.data.results;
};
