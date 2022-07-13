import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsFetching } from '../../../../redux/breeds-selectors';
import { getImagesListThunk } from '../../../../redux/images-reducer';
import { getFilter, getImagesCount, getImagesList } from '../../../../redux/images-selectors';
import Preloader from '../../../common/Preloader';
import BreedsList from '../BreedsPage/BreedsList';
import GalleryFilterForm from './GalleryFilterForm';
import classes from './GalleryPage.module.scss'

const GalleryPage: React.FC = () => {
   const imagesList = useSelector(getImagesList)
   // const order = useSelector(getOrder)

   const dispatch = useDispatch<any>()

   // const navigate = useNavigate()

   // const location = useLocation()
   // const page = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)


   // useEffect(() => {

   //    if (filter.filterByBreed === '') {
   //       const limit = filter.limitItems ? `&limit=${filter.limitItems}` : ''
   //       const qOrder = order === 'DESC' ? `&order=${order}` : ''
   //       navigate(`../breeds?page=${page}${limit}${qOrder}`, { replace: true })
   //    } else {
   //       navigate(`../breeds/images/search?breed_ids=${filter.filterByBreed}`, { replace: true })
   //    }


   // }, [filter.limitItems, page, order, filter.filterByBreed])


   useEffect(() => {
      dispatch(getImagesListThunk(filter, 0))
      // const obj = new URLSearchParams(location.search)

      // const breeds_ids: string | null = obj.get('breed_ids')

      // const initialLimitItems: number = Number(obj.get('limit'))

      // //prevent wrong limit items
      // const actualLimitItems: number = initialLimitItems < 5 ? 5 : initialLimitItems > 20 ? 20 : (Math.ceil(initialLimitItems / 5) * 5)

      // const limit = actualLimitItems ? `&limit=${actualLimitItems}` : ''

      // const currentPage: number = Number(obj.get('page'))
      // const initialOrder: 'DESC' | 'ASC' = obj.get('order') ? 'DESC' : 'ASC'

      // const actualOrder: string = initialOrder === 'DESC' ? `order=${initialOrder}` : ''

      // if (breeds_ids) {
      //    navigate(`../breeds/images/search?breed_ids=${breeds_ids}`, { replace: true })
      // } else {
      //    navigate(`../breeds?page=${currentPage}${limit}${actualOrder}`, { replace: true })
      // }
      // const values: BreedsFilterFormType = {
      //    filterByBreed: breeds_ids ? breeds_ids : filter.filterByBreed,
      //    limitItems: actualLimitItems
      // }

      // dispatch(getBreedsListThunk(values, currentPage, initialOrder))


   }, [])

   const isFetching = useSelector(getIsFetching)
   return <>
      <GalleryFilterForm />
      {isFetching &&
         <Preloader />
      }
      {!isFetching &&
         <BreedsList breedsList={imagesList} getItemsCount={getImagesCount} />
      }</>
}

export default GalleryPage
