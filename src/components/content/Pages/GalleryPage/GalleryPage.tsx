import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getIsFetching } from '../../../../redux/breeds-selectors';
import { actions, GalleryFilterFormType, getImagesListThunk, ImgTypeType, OrderType } from '../../../../redux/images-reducer';
import { getCurrentPage, getFilter, getImagesCount, getImagesList } from '../../../../redux/images-selectors';
import Preloader from '../../../common/Preloader';
import BreedsList from '../BreedsPage/BreedsList';
import GalleryFilterForm from './GalleryFilterForm';
import classes from './GalleryPage.module.scss'

const GalleryPage: React.FC = () => {

   const imagesList = useSelector(getImagesList)
   let currentPage = useSelector(getCurrentPage)
   const filter = useSelector(getFilter)

   const dispatch = useDispatch<any>()

   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      const { order, filterByBreed, limitItems, type } = filter
      const breed_id = filterByBreed ? `&breed_id=${filterByBreed}` : ''
      const qType = () => {
         switch (type) {
            case 'static':
               return 'jpg,png'
            case 'animated':
               return 'gif'
            default: return 'gif,jpg,png'
         }
      }
      navigate(`../gallery/search?page=${currentPage}&limit=${limitItems}&order=${order}&mime_types=${qType()}${breed_id}`, { replace: true })
   }, [filter, currentPage])

   useEffect(() => {
      const search = new URLSearchParams(location.search)

      const actualLimitItems: number = Number(search.get('limit') ? search.get('limit') : 5)
      const actualOrder: OrderType = search.get('order') === 'ASC' ? "ASC" : search.get('order') === 'DESC' ? 'DESC' : 'RANDOM'
      const actualfilterByBreed: string = String(search.get('breed_id') ? search.get('breed_id') : '')
      const actualType: ImgTypeType = (() => {
         switch (search.get('mime_types')) {
            case 'gif':
               return 'animated'
            case 'jpg,png':
               return 'static'
            default:
               return 'all'
         }
      })()
      const actualPage: number = Number(search.get('page'))

      const actualFilter: GalleryFilterFormType = {
         filterByBreed: actualfilterByBreed,
         limitItems: actualLimitItems,
         order: actualOrder,
         type: actualType
      }

      navigate(`../gallery/search?page=${actualPage}&limit=${actualLimitItems}&order=${actualOrder}&mime_types=${actualType}`, { replace: true })

      dispatch(getImagesListThunk(actualFilter, actualPage))
   }, [])

   const prevNext = (btn: 'prev' | 'next') => {
      btn === 'prev' ? --currentPage : ++currentPage
      return getImagesListThunk(filter, currentPage)
   }

   const isFetching = useSelector(getIsFetching)
   return <>
      <GalleryFilterForm />
      {isFetching &&
         <Preloader />
      }
      {!isFetching &&
         <BreedsList
            breedsList={imagesList}
            getItemsCount={getImagesCount}
            photosFromGallery={true} prevNext={prevNext}
            getCurrentPage={getCurrentPage}
            getFilter={getFilter} />
      }</>
}

export default GalleryPage
