import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { breedsAPI } from '../../../../api/breeds-api';
import { getBreedsListThunk, getTotalUsersCount } from '../../../../redux/breeds-reducer';
import { getBreedsList, getCurrentPage, getFilter, getIsFetching, getOrder, getUsersCount } from '../../../../redux/breeds-selectors';
import Preloader from '../../../common/Preloader';
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

   return <div className={classes.breedsList}>
      <div className={classes.grid__layout}>
         {breedPhotos()}
      </div>
      <Parinator />
   </div>
}

const Parinator = () => {
   const dispatch = useDispatch()
   const location = useLocation()
   const obj = new URLSearchParams(location.search)

   //button prev and next should be hide if displaed breed by id 
   const shouldButtonDisplay = obj.get('breed_ids')

   let currentPage = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)
   const usersCount = useSelector(getUsersCount)
   const order = useSelector(getOrder)

   const pagesCount = Math.floor(usersCount / filter.limitItems)

   //prev and next btn
   return <div className={classes.paginator}>
      {!shouldButtonDisplay &&
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
         </div>}
   </div>
}

const BreedsPage: React.FC = () => {

   const breedsList = useSelector(getBreedsList)
   const order = useSelector(getOrder)

   const dispatch = useDispatch()

   const navigate = useNavigate()

   const location = useLocation()
   const page = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)

   const isFetching = useSelector(getIsFetching)

   useEffect(() => {

      if (filter.filterByBreed === '') {
         const limit = filter.limitItems ? `&limit=${filter.limitItems}` : ''
         const qOrder = order === 'DESC' ? `&order=${order}` : ''
         navigate(`../breeds?page=${page}${limit}${qOrder}`, { replace: true })
      } else {
         navigate(`../breeds/images/search?breed_ids=${filter.filterByBreed}`, { replace: true })
      }


   }, [filter.limitItems, page, order, filter.filterByBreed])


   useEffect(() => {
      dispatch(getTotalUsersCount())
      const obj = new URLSearchParams(location.search)

      const breeds_ids: string | null = obj.get('breed_ids')

      const initialLimitItems: number = Number(obj.get('limit'))

      //prevent wrong limit items
      const actualLimitItems: number = initialLimitItems < 5 ? 5 : initialLimitItems > 20 ? 20 : (Math.ceil(initialLimitItems / 5) * 5)

      const limit = actualLimitItems ? `&limit=${actualLimitItems}` : ''

      const currentPage: number = Number(obj.get('page'))
      const initialOrder: 'DESC' | 'ASC' = obj.get('order') ? 'DESC' : 'ASC'
      // const initialOrder: string | null = obj.get('order') ? obj.get('order') : ''

      const actualOrder: string = initialOrder === 'DESC' ? `order=${initialOrder}` : ''

      if (breeds_ids) {
         navigate(`../breeds/images/search?breed_ids=${breeds_ids}`, { replace: true })
      } else {
         navigate(`../breeds?page=${currentPage}${limit}${actualOrder}`, { replace: true })
      }
      const values: BreedsFilterFormType = {
         filterByBreed: breeds_ids ? breeds_ids : filter.filterByBreed,
         limitItems: actualLimitItems
      }

      dispatch(getBreedsListThunk(values, currentPage, initialOrder))


   }, [])
   return <div className={classes.breedsPage}>
      <BreedsFilterForm />
      <div className={classes.wrapper}>
         {isFetching &&
            <Preloader />
         }
         {!isFetching &&
            <BreedsList breedsList={breedsList} />
         }
      </div>
   </div>
}

export default BreedsPage