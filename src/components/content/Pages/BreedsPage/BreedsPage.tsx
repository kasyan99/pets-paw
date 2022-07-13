import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBreedsListThunk, getTotalBreedsCount } from '../../../../redux/breeds-reducer';
import { getBreedsCount, getBreedsList, getCurrentPage, getFilter, getIsFetching, getOrder } from '../../../../redux/breeds-selectors';
import Preloader from '../../../common/Preloader';
import GalleryFilterForm from '../GalleryPage/GalleryFilterForm';
import { BreedsFilterFormType } from './BreedsFilterForm';
import BreedsList from './BreedsList';

const BreedsPage: React.FC = () => {

   const breedsList = useSelector(getBreedsList)
   const order = useSelector(getOrder)
   const filter = useSelector(getFilter)
   const isFetching = useSelector(getIsFetching)
   let page = useSelector(getCurrentPage)

   const dispatch = useDispatch<any>()

   const navigate = useNavigate()
   const location = useLocation()

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
      dispatch(getTotalBreedsCount())
      const obj = new URLSearchParams(location.search)

      const breeds_ids: string | null = obj.get('breed_ids')

      const initialLimitItems: number = Number(obj.get('limit'))

      //prevent wrong limit items
      const actualLimitItems: number = initialLimitItems < 5 ? 5 : initialLimitItems > 20 ? 20 : (Math.ceil(initialLimitItems / 5) * 5)

      const limit = actualLimitItems ? `&limit=${actualLimitItems}` : ''

      const currentPage: number = Number(obj.get('page'))
      const initialOrder: 'DESC' | 'ASC' = obj.get('order') ? 'DESC' : 'ASC'

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
   const prevNext = (btn: 'prev' | 'next') => {
      btn === 'prev' ? --page : ++page
      return getBreedsListThunk(filter, page, order)
   }

   return <>
      {isFetching &&
         <Preloader />
      }
      {!isFetching &&
         <BreedsList
            breedsList={breedsList}
            getItemsCount={getBreedsCount}
            prevNext={prevNext}
            photosFromGallery={false}
            getCurrentPage={getCurrentPage}
            getFilter={getFilter} />
      }</>

}

export default BreedsPage