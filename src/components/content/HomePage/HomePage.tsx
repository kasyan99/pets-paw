import React from 'react';
import classes from './HomePage.module.scss'
import catAndGirl from '../../../assets/girl-and-pet 1.png'

const HomePage: React.FC = () => {
   return <div className={classes.homePage}>
      <img src={catAndGirl} alt="cat and girl" />
   </div>
}

export default HomePage