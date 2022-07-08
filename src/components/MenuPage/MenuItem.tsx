import React from 'react';
import { Link } from 'react-router-dom';
import { ItemType } from './Menu';

import styles from './MenuPage.module.scss'

type PropsType = {
   item: ItemType
}

const MenuItem: React.FC<PropsType> = ({ item }) => {
   return <div className={styles.item}>
      <div style={{ backgroundColor: item.backgroundColor }}>
         <img src={item.image} alt={item.linkName} />
      </div>
      <div>
         <Link to={item.linkPath}>{item.linkName}</Link>
      </div>
   </div>
}

export default MenuItem