import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { success, failure, setCurrentPage } from '../../redux/actions';
import { API_KEY, BASE_API_URL, POPULARITY_DESC, IMG_PATH, SEARCH_API } from '../../actions';
import Loader from '../Loader';
import './home.css'
import { App_Routes } from '../../routes/RoutePath';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const currentPageState = useSelector((state) => state.currentPage);
  const apiState = useSelector((state) => state.api);
  const dispatch = useDispatch();

  const fetchMovies = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(success(data.results));
    } catch (error) {
      dispatch(failure(error.message));
    }
  };

  const buildApiUrl = (page) => {
    return `${BASE_API_URL}?sort_by=${POPULARITY_DESC}&api_key=${API_KEY}&page=${page}`;
  };

  const handleSearch = async () => {
    try {
      await fetchMovies(`${SEARCH_API}${searchQuery}`);
    } catch (error) {
      dispatch(failure(error.message));
    }
  };

  useEffect(() => {
    if (searchQuery !== '') {
      handleSearch();
    } else {
      fetchMovies(buildApiUrl(currentPageState.currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageState, searchQuery]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= 30) {
      dispatch(setCurrentPage(page))
    }
  };

  const paginationArray = [];
  for (let i = 1; i <= 30; i++) {
    paginationArray.push(i);
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) {
      return 'green';
    } else if (rating >= 6) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <>
      <div className="home-container">
        {apiState.loading ? (
          <Loader />
        ) : apiState.error ? (
          <div>Error: {apiState.error}</div>
        ) : (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Your Movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="wrapper">
              <div className='current_page'>You're on page no {currentPageState.currentPage}</div>
              <div className='pagination'>
                <div className='buttons' title='scroll-right'>
                  {paginationArray.map((el, id) => (
                    <button
                      className={`p-btn ${el === currentPageState ? 'active' : ''}`}
                      key={id}
                      onClick={() => handlePageChange(el)}
                    >
                      {el}
                    </button>
                  ))}
                </div>
              </div>
              <div className="cards-container">
                {apiState.data && apiState.data.length > 0 ? (
                  apiState.data.map((movie) => (
                    <div className="each-card">
                      <Link to={`${App_Routes.DETAILS}/${movie.id}`} key={movie.id}>
                        <div className="movie-img-container">
                          <img src={`${IMG_PATH}${movie.backdrop_path}`} alt={movie.title} />
                        </div>
                        <div className="movie-head">
                          <div className='head'>{movie.title}</div>
                          <div className={`rating ${getRatingColor(movie.vote_average)}`}>
                            {movie.vote_average}
                          </div>
                        </div>
                        <p className='desc'>
                          {movie.overview.length > 120 ? `${movie.overview.substring(0, 80)}...` : movie.overview}
                        </p>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div>No movies found</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
