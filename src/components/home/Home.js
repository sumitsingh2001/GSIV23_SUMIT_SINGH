import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { success, failure } from '../../redux/actions';

const Home = () => {
  const API_URl =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d944b962c7b5362251d6c7f872bf236&page=1';

  const apiState = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (url = API_URl) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results);
        dispatch(success(data.results));
      } catch (error) {
        dispatch(failure(error.message));
      }
    };

    fetchData();

    return () => {
      fetchData();
    };
  }, [dispatch]);

  return <div>Home</div>;
};

export default Home;
