import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ItemType } from './Menu';

import styles from './MenuPage.module.scss'

type PropsType = {
   item: ItemType
}

const MenuItem: React.FC<PropsType> = ({ item }) => {

   const location = useLocation()

   //for active(change css) if this page is chosen  
   const isPath = location.pathname.includes(item.linkPath)

   return <div className={styles.item}>
      <div style={{ backgroundColor: item.backgroundColor }}>
         <img src={item.image} alt={item.linkName} />
      </div>
      <div className={isPath ? styles.active : ''}>
         <Link to={item.linkPath}><span>{item.linkName}</span></Link>
      </div>

   </div>
}

export default MenuItem