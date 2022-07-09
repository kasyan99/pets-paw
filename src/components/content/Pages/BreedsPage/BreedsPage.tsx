import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedsListThunk } from '../../../../redux/breeds-reducer';
import { getBreedsList, getCurrentPage, getFilter, getOrder, getUsersCount } from '../../../../redux/breeds-selectors';
import BreedsFilterForm, { BreedsFilterFormType } from './BreedsFilterForm';
import classes from './BreedsPage.module.scss'

const notFoundImage = 'https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg'

type Props = {
   breedsList: Array<any>
}

const BreedsList: React.FC<Props> = ({ breedsList }) => {
   //filter breeds list from API and create list of img
   const breedPhotos = () => {
      if (breedsList.length > 0) {
         return breedsList.map(breed => {
            if (breed.image && breed.image.url) {
               return <div className={classes.grid__item}
                  key={breed.id}>
                  <img src={breed.image.url} alt={breed.alt_names === '' ? breed.name : breed.alt_names} />
                  <div><span>{breed.name}</span></div>
               </div>
            } else {
               const src = breed.url ? breed.url : notFoundImage
               return <div className={classes.grid__item}
                  key={breed.id}>
                  <img src={src} alt={breed.alt_names === '' ? breed.name : breed.alt_names} />
                  <div><span><span>{breed.name}</span></span></div>
               </div>
            }
         })

      } else {
         return <></>
      }
   }

   return <div className={classes.breedsList}>
      <div className={classes.grid__layout}>
         {breedPhotos()}
      </div>
      <Parinator />
   </div>
}

const Parinator = () => {
   const dispatch = useDispatch()

   let currentPage = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)
   const usersCount = useSelector(getUsersCount)
   const order = useSelector(getOrder)

   const pagesCount = Math.floor(usersCount / filter.limitItems)
   console.log(currentPage);
   debugger
   //prev and next btn
   return <div className={classes.paginator}>
      <div>
         {currentPage > 0 &&
            <button type='button'
               className={`${classes.element} ${classes.btn} ${classes.btn_prev}`}
               onClick={() => currentPage > 0 && dispatch(getBreedsListThunk(filter, --currentPage, order))}
            >PREV</button>}
         {currentPage < pagesCount &&
            <button type='button'
               className={`${classes.element} ${classes.btn} ${classes.btn_next}`}
               onClick={() => currentPage < pagesCount && dispatch(getBreedsListThunk(filter, ++currentPage, order))}
            >NEXT</button>}
      </div>
   </div>
}

const BreedsPage: React.FC = () => {
   const currentPage = useSelector(getCurrentPage)
   const breedsList = useSelector(getBreedsList)
   const order = useSelector(getOrder)

   const dispatch = useDispatch()
   useEffect(() => {
      const values: BreedsFilterFormType = {
         filterByBreed: '',
         limitItems: 5
      }
      dispatch(getBreedsListThunk(values, currentPage, order))

   }, [])
   return <div className={classes.breedsPage}>
      <BreedsFilterForm />
      <div className={classes.wrapper}>
         <BreedsList breedsList={breedsList} />
      </div>
   </div>
}

export default BreedsPage