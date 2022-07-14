import React, { MouseEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BreedsFilterType } from '../../../../redux/breeds-reducer';
import { GalleryFilterFormType } from '../../../../redux/images-reducer';
import { AppStateType } from "../../../../redux/redux-store"

import classes from './BreedsPage.module.scss'

const notFoundImage = 'https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg'

type Props = {
   breedsList: Array<any>
   getItemsCount: (state: AppStateType) => number
   photosFromGallery: boolean
   prevNext: (btn: 'prev' | 'next') => void
   getCurrentPage: (state: AppStateType) => number
   getFilter: (state: AppStateType) => GalleryFilterFormType | BreedsFilterType
}

const BreedsList: React.FC<Props> = ({ breedsList, getItemsCount, photosFromGallery, prevNext, getCurrentPage, getFilter }) => {
   const navigate = useNavigate()
   const getBreedId = (e: any) => {
      navigate(`../breeds/info/${e.target.id}`, { replace: true })
   }
   //filter breeds list from API and create list of img
   const breedPhotos = () => {
      if (breedsList.length > 0) {
         return breedsList.map(breed => {
            if (breed.image && breed.image.url) {
               return <div className={classes.grid__item}
                  key={breed.id} onClick={(e: any) => getBreedId(e)}>

                  <img src={breed.image.url} alt={breed.alt_names === '' ? breed.name : breed.alt_names} />
                  <div id={breed.id}><span>{breed.name}</span></div>
               </div>
            } else {
               const quest = breed.breeds ? breed.breeds[0].name : ''

               const src = breed.url ? breed.url : notFoundImage
               const name = breed.name ? breed.name : quest
               const alt = breed.alt_names ? breed.alt_names :
                  breed.name ? breed.name : quest

               return <div className={classes.grid__item}
                  key={breed.id}>
                  <img src={src} alt={!breed.alt_names ? name : alt} />
                  <div><span><span>{name}</span></span></div>
               </div>
            }
         })

      } else {
         return <></>
      }
   }

   const galleryPhotos = () => {
      if (breedsList.length > 0) {
         return breedsList.map(breed => {
            return <div className={classes.grid__item}
               key={breed.id}>
               <img src={breed.url} alt={breed.id} />
               <div><span>{breed.id}</span></div>
            </div>
         })

      } else {
         return <></>
      }
   }


   return <div className={classes.breedsList}>
      <div className={classes.grid__layout}>
         {photosFromGallery ? galleryPhotos() : breedPhotos()}
      </div>
      <Parinator getItemsCount={getItemsCount} prevNext={prevNext} getCurrentPage={getCurrentPage} getFilter={getFilter} />
   </div>
}

type PaginatorType = {
   getItemsCount: (state: AppStateType) => number
   prevNext: (btn: 'prev' | 'next') => void
   getCurrentPage: (state: AppStateType) => number
   getFilter: (state: AppStateType) => any
}

const Parinator: React.FC<PaginatorType> = ({ getItemsCount, prevNext, getCurrentPage, getFilter }) => {
   const dispatch = useDispatch<any>()
   const location = useLocation()
   const obj = new URLSearchParams(location.search)

   //button prev and next should be hide if displaed breed by id 
   const shouldButtonDisplay = obj.get('breed_ids')

   let currentPage = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)
   const itemsCount = useSelector(getItemsCount)

   const pagesCount = Math.floor(itemsCount / filter.limitItems)

   //prev and next btn
   return <div className={classes.paginator}>
      {!shouldButtonDisplay &&
         <div>
            {currentPage > 0 &&
               <button type='button'
                  className={`${classes.element} ${classes.btn} ${classes.btn_prev}`}
                  onClick={() => currentPage > 0 && dispatch(prevNext('prev'))}
               >PREV</button>}
            {currentPage < pagesCount &&
               <button type='button'
                  className={`${classes.element} ${classes.btn} ${classes.btn_next}`}
                  onClick={() => currentPage < pagesCount && dispatch(prevNext('next'))}
               >NEXT</button>}
         </div>}
   </div>
}

export default BreedsList