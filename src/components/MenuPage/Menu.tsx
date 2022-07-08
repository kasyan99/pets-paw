import React from 'react';
import MenuItem from './MenuItem';

import voteTable from '../../assets/icons/vote-table.png'
import petBreeds from '../../assets/icons/pet-breeds.png'
import imagesSearch from '../../assets/icons/images-search.png'


import classes from './MenuPage.module.scss'

const itemsList = [
   {
      id: 1,
      image: voteTable,
      backgroundColor: '#B4B7FF',
      linkName: 'VOTING',
      linkPath: '/voting'
   },
   {
      id: 2,
      image: petBreeds,
      backgroundColor: '#97EAB9',
      linkName: 'BREEDS',
      linkPath: '/breeds'
   },
   {
      id: 3,
      image: imagesSearch,
      backgroundColor: '#FFD280',
      linkName: 'GALLERY',
      linkPath: '/gallery'
   },
]

export type ItemType = typeof itemsList[1]

const Menu: React.FC = () => {
   return <div className={classes.menu}>
      {itemsList.map(item => <MenuItem item={item} key={item.id} />)}
   </div>
}

export default Menu