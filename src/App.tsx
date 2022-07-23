import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import './App.css';
import Preloader from './components/common/Preloader';
import MenuPage from './components/MenuPage/MenuPage';
import { getIsUploading } from './redux/uploading-selectors';
import uploadingClasses from './components/content/Pages/UploadingPage/UploadingPage.module.scss'
import { getIsBlack } from './redux/theme-selectors';

const HomePage = React.lazy(() => import('./components/content/HomePage/HomePage'))
const Content = React.lazy(() => import('./components/content/Content'))


const App: React.FC = () => {
  const isUploading = useSelector(getIsUploading)
  const isBlack = useSelector(getIsBlack)
  return (
    <div className={`App ${isBlack && 'black'}`}>
      {isUploading && <div className={`${uploadingClasses.cover} ${isBlack && uploadingClasses.black}`}></div>}
      {/* <div className="container"> */}
      <div className="wrapper">
        <MenuPage />
        <Suspense fallback={<Preloader />}>
          {useRoutes([
            { path: "/", element: <HomePage /> },
            { path: "/*", element: <Content /> }
          ])}

        </Suspense>
      </div>
      {/* </div> */}
    </div>
  );
}

export default App;

