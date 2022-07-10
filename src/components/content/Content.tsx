import React, { Suspense } from 'react';
import HomePage from './Pages/HomePage/HomePage';

import classes from './Content.module.scss'
import { useRoutes } from 'react-router-dom';
// import VotingPage from './Pages/VotingPage/VotingPage';
// import BreedsPage from './Pages/BreedsPage/BreedsPage';
// import GalleryPage from './Pages/GalleryPage/GalleryPage';
import Preloader from '../common/Preloader';


const VotingPage = React.lazy(() => import('./Pages/VotingPage/VotingPage'))
const BreedsPage = React.lazy(() => import('./Pages/BreedsPage/BreedsPage'))
const GalleryPage = React.lazy(() => import('./Pages/GalleryPage/GalleryPage'))


const Content: React.FC = () => {
   return <div className={classes.content}>
      <Suspense fallback={<Preloader />}>
         {useRoutes([
            { path: "/", element: <HomePage /> },
            { path: "/voting", element: <VotingPage /> },
            { path: "/breeds/*", element: <BreedsPage /> },
            { path: "/gallery", element: <GalleryPage /> },
         ])}
      </Suspense>
   </div>
}

export default Content