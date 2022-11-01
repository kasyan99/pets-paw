import React from 'react';
import classes from './HomePage.module.scss'
import catAndGirl from '../../../assets/girl-and-pet 1.png'
import { useSelector } from 'react-redux';
import { getIsBlack } from '../../../redux/theme-selectors';

const HomePage: React.FC = () => {
   const isBlack = useSelector(getIsBlack)

   return <div className={`${classes.homePage} ${isBlack && classes.black}`}>
      <img src={catAndGirl} alt="cat and girl" data-testid='home-img' />
   </div>
}

export default HomePage