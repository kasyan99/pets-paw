import React from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { useNavigate, useRoutes } from "react-router-dom"
import { getNumbersById } from "../../../../redux/breeds-selectors"
import { getCurrentLocation, getLocationList } from "../../../../redux/location-selectors"
import { actions } from "../../../../redux/uploading-reducer"
import { actions as locationActions } from "../../../../redux/location-reducer"
import BreedsFilterForm from "../BreedsPage/BreedsFilterForm"
import classes from './Header.module.scss'
import { getIsBlack } from "../../../../redux/theme-selectors"
import { useAppDispatch } from "../../../../hooks/useAppDispatch"


const Header: React.FC = () => {
   const location = useLocation()
   const pathnames = location.pathname.slice(1).split('/')
   const pageName = pathnames[0].toUpperCase()
   const breedsNumbersById = useSelector(getNumbersById)

   const id = breedsNumbersById ? breedsNumbersById[`${pathnames[2]}`] : ''

   const dispatch = useAppDispatch()

   const openModal = () => {
      dispatch(actions.toggleIsUploading(true))
   }

   const navigate = useNavigate()
   const locationList = useSelector(getLocationList)
   const currentLocation = useSelector(getCurrentLocation)

   const returnBack = () => {
      dispatch(locationActions.setIsBack(true))

      const prevLocation = currentLocation - 1
      const prevPath = locationList[prevLocation]

      dispatch(locationActions.setCurrentlocation(prevLocation))
      dispatch(locationActions.removeLocation())

      navigate(`../${prevPath}`, { replace: true })
   }

   const isBlack = useSelector(getIsBlack)

   return <div className={`${classes.header} ${location.pathname.split('/')[2] === 'info' && classes.onInfo}`}>
      <div className={classes.wrapper}>
         <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_back} ${isBlack && classes.black}`} onClick={returnBack}>back</button>
         <div className={`${classes.element} ${classes.pageName} ${pathnames[1] === 'info' ? `${classes.pageNameOnInfo} ${isBlack && classes.black}` : ''}`}>
            <span>{pageName}</span>
         </div>
      </div>
      {useRoutes([
         { path: "/breeds/*", element: <>{pathnames[1] === 'info' ? <div className={classes.idNumberWrapper}><div className={classes.idNumber}><span>{id}</span></div></div> : <BreedsFilterForm />}</> },
         { path: "/gallery/*", element: <div onClick={openModal} className={`${classes.upload} ${isBlack && classes.black}`} data-testid='open-modal'><span></span><button>UPLOAD</button></div> },
      ])}
   </div>
}

export default Header