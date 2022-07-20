import React, { useEffect } from 'react';
import Menu from './Menu';
import classes from './MenuPage.module.scss'
import logo from '../../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/location-reducer';
import { getCurrentLocation, getIsBack } from '../../redux/location-selectors';

const MenuPage: React.FC = () => {

   const dispatch = useDispatch()
   const location = useLocation()

   const currentlocation = useSelector(getCurrentLocation)
   const isBack = useSelector(getIsBack)

   useEffect(() => {
      if (!isBack) {
         const newLocation = currentlocation + 1

         dispatch(actions.setCurrentlocation(newLocation))
         dispatch(actions.addLocation(location.pathname))
      } else {
         dispatch(actions.setIsBack(false))
      }
   }, [location.pathname])

   return <div className={classes.menuPage}>
      <div className={classes.menuBody}>
         <h2>Hi intern!</h2>
         <Link to='/' className={classes.logo}><img src={logo} alt="" /></Link>
         <p>Welcome to MI 2022 Front-end test</p>
         <p>Lets start using The Cat API</p>
         <Menu />
      </div>
   </div>
}

export default MenuPage