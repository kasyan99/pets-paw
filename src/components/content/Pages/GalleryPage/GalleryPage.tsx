import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../../../redux/breeds-selectors';
import Preloader from '../../../common/Preloader';
import GalleryFilterForm from './GalleryFilterForm';
import classes from './GalleryPage.module.scss'

const GalleryPage: React.FC = () => {
   const isFetching = useSelector(getIsFetching)

   return <>
      <GalleryFilterForm />
      {isFetching &&
         <Preloader />
      }
      {!isFetching && <div></div>
         // <BreedsList breedsList={breedsList} />
      }</>
}

export default GalleryPage