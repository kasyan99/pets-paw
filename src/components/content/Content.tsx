import React, { Suspense } from 'react';
import classes from './Content.module.scss'
import { useLocation, useRoutes } from 'react-router-dom';
import Preloader from '../common/Preloader';
import SearchForm from '../common/SearchForm';
import Header from './Pages/Header/Heared';
import BreedsInfo from './Pages/BreedsPage/BreedsInfo/BreedsInfo';
import { useSelector } from 'react-redux';
import { getIsUploading } from '../../redux/uploading-selectors';
import UploadingPage from './Pages/UploadingPage/UploadingPage';


const VotingPage = React.lazy(() => import('./Pages/VotingPage/VotingPage'))
const BreedsPage = React.lazy(() => import('./Pages/BreedsPage/BreedsPage'))
const GalleryPage = React.lazy(() => import('./Pages/GalleryPage/GalleryPage'))

const SearchPage = React.lazy(() => import('./Pages/SearchPage/SearchPage'))
const FavouritiesPage = React.lazy(() => import('./Pages/FavouritiesPage/FavouritiesPage'))
const LikesPage = React.lazy(() => import('./Pages/LikesPage/LikesPage'))


const Content: React.FC = () => {
   const location = useLocation()
   const isIploading = useSelector(getIsUploading)
   return <div className={classes.content}>
      {isIploading &&
         <UploadingPage />}
      <>
         <SearchForm />
         <div className={`${classes.page} ${location.pathname === '/voting' && classes.pageOnVoting}`}>
            <Header />
            <div className={classes.wrapper}>
               <Suspense fallback={<Preloader />}>
                  {useRoutes([
                     { path: "/voting", element: <VotingPage /> },
                     { path: "/breeds/*", element: <BreedsPage /> },
                     { path: "/breeds/info/*", element: <BreedsInfo /> },
                     { path: "/gallery/*", element: <GalleryPage /> },
                     { path: "/search", element: <SearchPage /> },
                     { path: "/favourities/*", element: <FavouritiesPage /> },
                     { path: "/likes", element: <LikesPage value={1} /> },
                     { path: "/dislikes", element: <LikesPage value={0} /> },
                  ])}
               </Suspense>
            </div>
         </div>
      </>
   </div>
}

export default Content