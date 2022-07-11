import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import './App.css';
import Preloader from './components/common/Preloader';
import MenuPage from './components/MenuPage/MenuPage';

const HomePage = React.lazy(() => import('./components/content/HomePage/HomePage'))
const Content = React.lazy(() => import('./components/content/Content'))

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="wrapper">
          <MenuPage />
          <Suspense fallback={<Preloader />}>
            {useRoutes([
              { path: "/", element: <HomePage /> },
              { path: "/*", element: <Content /> }
            ])}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;

