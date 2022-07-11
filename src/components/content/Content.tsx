import React, { Suspense } from 'react';
import HomePage from './Pages/HomePage/HomePage';

import classes from './Content.module.scss'
import { useRoutes } from 'react-router-dom';
import Preloader from '../common/Preloader';

const VotingPage = React.lazy(() => import('./Pages/VotingPage/VotingPage'))
const BreedsPage = React.lazy(() => import('./Pages/BreedsPage/BreedsPage'))
const GalleryPage = React.lazy(() => import('./Pages/GalleryPage/GalleryPage'))

const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'))
const FavouritiesPage = React.lazy(() => import('./Pages/FavouritiesPage/FavouritiesPage'))
const LikesPage = React.lazy(() => import('./Pages/LikesPage/LikesPage'))
const DislikesPage = React.lazy(() => import('./Pages/DislikesPage/DislikesPage'))


const Content: React.FC = () => {
   return <div className={classes.content}>
      <Suspense fallback={<Preloader />}>
         {useRoutes([
            { path: "/", element: <HomePage /> },
            { path: "/voting", element: <VotingPage /> },
            { path: "/breeds/*", element: <BreedsPage /> },
            { path: "/gallery", element: <GalleryPage /> },
            { path: "/search", element: <SearchPage /> },
            { path: "/favourities", element: <FavouritiesPage /> },
            { path: "/likes", element: <LikesPage /> },
            { path: "/dislikes", element: <DislikesPage /> },
         ])}
      </Suspense>
   </div>
}

export default Content