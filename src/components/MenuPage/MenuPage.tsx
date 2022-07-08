import React from 'react';
import Menu from './Menu';
import classes from './MenuPage.module.scss'
import logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom';

const MenuPage: React.FC = () => {
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