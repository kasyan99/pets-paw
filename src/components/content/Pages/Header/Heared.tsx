import React from "react"
import { useLocation } from "react-router"
import { useRoutes } from "react-router-dom"
import BreedsFilterForm from "../BreedsPage/BreedsFilterForm"
import GalleryFilterForm from "../GalleryPage/GalleryFilterForm"
import classes from './Header.module.scss'


const Header = () => {
   const location = useLocation()
   const pageNaame = location.pathname.slice(1).split('/')[0].toUpperCase()

   return <div className={classes.header}>
      <div className={classes.wrapper}>
         <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_back}`}></button>
         <div className={`${classes.element} ${classes.pageName}`}>
            <span>{pageNaame}</span>
         </div>
      </div>
      {useRoutes([
         { path: "/breeds/*", element: <BreedsFilterForm /> },
         {
            path: "/gallery", element: <div className={classes.upload}><button>UPLOAD</button></div>
         },
      ])}
   </div>
}

export default Header