import React, { useEffect } from 'react';
import Menu from './Menu';
import classes from './MenuPage.module.scss'
import logo from '../../assets/Logo.png'
import logoBlack from '../../assets/Logo_black.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/location-reducer';
import { getCurrentLocation, getIsBack } from '../../redux/location-selectors';
import { getIsBlack, getIsMenu } from '../../redux/theme-selectors';
import { actions as actionsTheme } from '../../redux/theme-reducer';

const MenuPage: React.FC = () => {

   const dispatch = useDispatch()
   const location = useLocation()
   const navigate = useNavigate()
   const currentlocation = useSelector(getCurrentLocation)
   const isBack = useSelector(getIsBack)

   useEffect(() => {

      const pathList = ['voting', 'breeds', 'gallery', 'search', 'favourities', 'likes', 'dislikes']
      const isCorrectPath = pathList.map(path => {
         if (location.pathname.split('/')[1] === path) {
            return true
         }
      })
      //wrong path protection
      if (!isCorrectPath.includes(true)) {
         navigate(`../`, { replace: true })
      }
      if (!isBack) {
         const newLocation = currentlocation + 1

         dispatch(actions.setCurrentlocation(newLocation))
         dispatch(actions.addLocation(location.pathname))
      } else {
         dispatch(actions.setIsBack(false))
      }
      dispatch(actionsTheme.toggleIsMenu(false))
   }, [location.pathname])

   const isBlack = useSelector(getIsBlack)
   const isMenu = useSelector(getIsMenu)

   const changeTheme = () => {
      dispatch(actionsTheme.toggleIsBlack())
   }

   const closeMenu = () => {
      dispatch(actionsTheme.toggleIsMenu(false))
   }

   return <div className={`${classes.menuPage} ${isBlack && classes.black} ${location.pathname === '/' && classes.menuPageOnHome} ${isMenu && classes.coverMenu}`}>
      <div className={classes.menuBody}>
         <h2>Hi intern!</h2>
         <Link to='/' className={classes.logo}>
            <img src={isBlack ? logoBlack : logo} alt="Logo PetsPaw" />
         </Link>
         <div className={classes.themeBtn}><button onClick={changeTheme}>Change theme</button></div>
         <button className={classes.closeMenuBtn} onClick={closeMenu}>Close menu</button>
         <p>Welcome to MI 2022 Front-end test</p>
         <p>Lets start using The Cat API</p>
         <Menu />
      </div>
   </div>
}

export default MenuPage