import React, { Suspense, lazy } from 'react';
import { Routes as DomRoutes, Route } from 'react-router-dom';
import { App_Routes } from './RoutePath';

import Loader from '../components/Loader';
const Home = lazy(() => import('../components/home/Home'));
const Details = lazy(() => import('../components/details/Details'));

const Routes = () => {
  return (
    <>
      <DomRoutes>
        <Route
          path={App_Routes.HOME}
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path={App_Routes.DETAILS_ID}
          element={
            <Suspense fallback={<Loader />}>
              <Details />
            </Suspense>
          }
        />
      </DomRoutes>
    </>
  );
};

export default Routes;
