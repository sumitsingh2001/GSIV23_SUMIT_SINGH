import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API_KEY, IMG_PATH } from '../../actions';
import './details.css'
import Loader from '../Loader';
import { AiFillHome } from 'react-icons/ai'
import { App_Routes } from '../../routes/RoutePath';

const Details = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchMovieById = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log('Movie ID:', id);

        const movieDetails = await fetchMovieById(id);
        setMovieData(movieDetails);
        setIsLoading(false)
      } catch (error) {
        console.log(error, 'error-msg');
        setIsLoading(false)
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <>
      {
        isLoading ?
          <div><Loader /></div>
          : (
            <>
              <div className="head-movieID">
                <h3>Movie Details</h3>
                <Link to={App_Routes.HOME}><AiFillHome color='#000' fontSize={28} /></Link>
              </div>
              <div className='movieID-data'>
                <div className="movieID-data-container">
                  <div className="movieID-img">
                    <img src={`${IMG_PATH}${movieData.poster_path}`} alt={movieData.title} />
                  </div>
                  <div className="movieID-desc">
                    <div className="f-row">
                      <div className="title">{movieData.title}</div>
                      <div className="rate">Rating: {movieData.vote_average.toFixed(2)}</div>
                    </div>
                    <div className="s-row">
                      {movieData.release_date} | {movieData.length || 'Length'} | {movieData.director || 'Director'}
                    </div>
                    <div className="t-row">
                      Cast: {movieData.length || 'Actor1'} | {movieData.director || 'Actor2'}
                    </div>
                    <div className="l-row">
                      Description: {movieData.overview}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      }
    </>
  )
};

export default Details;
