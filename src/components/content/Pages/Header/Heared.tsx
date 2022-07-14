import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import { useRoutes } from "react-router-dom"
import { breedsAPI } from "../../../../api/breeds-api"
import { getBreedsNumbersById } from "../../../../redux/breeds-reducer"
import { getNumbersById } from "../../../../redux/breeds-selectors"
import BreedsFilterForm from "../BreedsPage/BreedsFilterForm"
import GalleryFilterForm from "../GalleryPage/GalleryFilterForm"
import classes from './Header.module.scss'


const Header = () => {
   const location = useLocation()
   const pathnames = location.pathname.slice(1).split('/')
   const pageName = pathnames[0].toUpperCase()
   const breedsNumbersById = useSelector(getNumbersById)

   useEffect(() => {
      console.log(breedsNumbersById);
   }, [breedsNumbersById])

   const id = breedsNumbersById ? breedsNumbersById[`${pathnames[2]}`] : ''

   return <div className={classes.header}>
      <div className={classes.wrapper}>
         <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_back}`}></button>
         <div className={`${classes.element} ${classes.pageName} ${pathnames[1] === 'info' ? classes.pageNameOnInfo : ''}`}>
            <span>{pageName}</span>
         </div>
      </div>
      {useRoutes([
         { path: "/breeds/*", element: <>{pathnames[1] === 'info' ? <div className={classes.idNumberWrapper}><div className={classes.idNumber}><span>{id}</span></div></div> : <BreedsFilterForm />}</> },
         { path: "/gallery", element: <div className={classes.upload}><button>UPLOAD</button></div> },
      ])}
   </div>
}

export default Header