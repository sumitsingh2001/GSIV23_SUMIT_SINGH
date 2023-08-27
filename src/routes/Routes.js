import React, { lazy } from 'react';
import { Routes as DomRoutes, Route } from 'react-router-dom';
import { App_Routes } from './RoutePath';
const Home = lazy(() => import('../components/home/Home'));
const Details = lazy(() => import('../components/details/Details'));

const Routes = () => {
  return (
    <>
      <DomRoutes>
        <Route path={App_Routes.HOME} element={<Home />} />
        <Route path={App_Routes.DETAILS} element={<Details />} />
      </DomRoutes>
    </>
  );
};

export default Routes;
