import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBreedsByname, getIsFetching } from '../../../../redux/search-selectors';
import NoItemFound from '../../../common/NoItemFound';
import Preloader from '../../../common/Preloader';
import classes from '../BreedsPage/BreedsPage.module.scss'

const notFoundImage = 'https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg'

const SearchPage: React.FC = () => {
   const navigate = useNavigate()

   const getBreedId = (e: any) => {

      navigate(`../breeds/info/${e.target.id}`, { replace: true })
   }

   const breedsList = useSelector(getBreedsByname)

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
   const isFetching = useSelector(getIsFetching)
   return <>
      {breedsList.length === 0 &&
         <NoItemFound />}
      {!isFetching &&
         <div className={classes.breedsList}>
            <div className={classes.grid__layout}>
               {breedPhotos()}
            </div>
         </div>}
      {isFetching &&
         <Preloader />}
   </>
}

export default SearchPage