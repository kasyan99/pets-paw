import React from 'react';
import HomePage from './Pages/HomePage';

import classes from './Content.module.scss'
import { useRoutes } from 'react-router-dom';
import VotingPage from './Pages/VotingPage';
import BreedsPage from './Pages/BreedsPage';
import GalleryPage from './Pages/GalleryPage';




const Content: React.FC = () => {
   return <div className={classes.content}>
      {useRoutes([
         { path: "/", element: <HomePage /> },
         { path: "/voting", element: <VotingPage /> },
         { path: "/breeds", element: <BreedsPage /> },
         { path: "/gallery", element: <GalleryPage /> },
      ])}
   </div>
}

export default Content