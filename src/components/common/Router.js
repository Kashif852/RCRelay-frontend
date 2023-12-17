import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routesConfig from '../../routes/config';
import Layout from '../layout/Layout'; 

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {routesConfig.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />} 
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
