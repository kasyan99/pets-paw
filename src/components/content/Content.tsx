import React, { Suspense } from 'react';
import classes from './Content.module.scss'
import { useRoutes } from 'react-router-dom';
import Preloader from '../common/Preloader';
import SearchForm from '../common/SearchForm';
import BreedsFilterForm from './Pages/BreedsPage/BreedsFilterForm';
import Header from './Pages/Header/Heared';

const VotingPage = React.lazy(() => import('./Pages/VotingPage/VotingPage'))
const BreedsPage = React.lazy(() => import('./Pages/BreedsPage/BreedsPage'))
const GalleryPage = React.lazy(() => import('./Pages/GalleryPage/GalleryPage'))

const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'))
const FavouritiesPage = React.lazy(() => import('./Pages/FavouritiesPage/FavouritiesPage'))
const LikesPage = React.lazy(() => import('./Pages/LikesPage/LikesPage'))
const DislikesPage = React.lazy(() => import('./Pages/DislikesPage/DislikesPage'))


const Content: React.FC = () => {
   return <div className={classes.content}>
      <SearchForm />
      <div className={classes.page}>
         {/* <BreedsFilterForm /> */}
         <Header />
         <div className={classes.wrapper}>
            <Suspense fallback={<Preloader />}>
               {useRoutes([
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
      </div>
   </div>
}

export default Content