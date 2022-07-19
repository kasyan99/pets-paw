import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavourite } from '../../../../redux/voting-reducer';
import { getCurrentPage, getFavList, getIsFetching, getLimit, getTotalCount, getUserActions } from '../../../../redux/favourites-selectors';
import { Paginator } from '../BreedsPage/BreedsList';
import favClasses from './FavouritiesPage.module.scss'
import breedClasses from '../BreedsPage/BreedsPage.module.scss'
import votingClasses from '../VotingPage/VotingPage.module.scss'
import { actions, getFavouritesList } from '../../../../redux/favourites-reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserActionLogs } from '../VotingPage/VotingPage';
import { addUserActionCreator } from '../../../../utils/usersActionLogsCreator';
import Preloader from '../../../common/Preloader';

const FavouritiesPage: React.FC = () => {
   const dispatch = useDispatch<any>()

   const limit = useSelector(getLimit)
   let currentPage = useSelector(getCurrentPage)
   const navigate = useNavigate()
   const location = useLocation()
   const search = new URLSearchParams(location.search)
   useEffect(() => {
      const actualPage: number = Number(search.get('page'))
      navigate(`../favourities?page=${actualPage}`, { replace: true })

      dispatch(getFavouritesList(limit, actualPage))
   }, [])

   useEffect(() => {
      navigate(`../favourities?page=${currentPage}`, { replace: true })
   }, [currentPage])

   const favouritesList = useSelector(getFavList)

   const removeFavourite = async (fav_id: string, breed_id: string) => {

      await dispatch(deleteFavourite(fav_id, breed_id))
      dispatch(getFavouritesList(limit, currentPage, false))
   }

   const galleryPhotos = () => {

      if (favouritesList.length > 0) {
         return favouritesList.map(breed => {
            // const fav_id = breed.id
            return <div className={`${breedClasses.grid__item} ${breedClasses.grid__item_gallery}`}
               key={breed.id}>
               <img src={breed.image.url} alt={breed.id} />
               <div><button onClick={() => { removeFavourite(breed.id, breed.image.id); addUserAction(breed.image.id, null, 'remove') }} className={breedClasses.remove}>remove to favourite</button>
               </div>
            </div>
         })

      } else {
         return <></>
      }
   }


   const prevNext = (btn: 'prev' | 'next') => {
      btn === 'prev' ? --currentPage : ++currentPage
      return getFavouritesList(limit, currentPage)
   }
   const userActions = useSelector(getUserActions)

   const addUserAction = addUserActionCreator(userActions, () => dispatch(actions.removeUserAction()), (userAction) => dispatch(actions.addUserAction(userAction)), 2)

   const isFetching = useSelector(getIsFetching)
   return <>
      {!isFetching &&
         <div className={breedClasses.breedsList}>
            <div className={breedClasses.grid__layout}>
               {galleryPhotos()}

            </div>
            <div className={breedClasses.bottomWrapper}>
               <div className={votingClasses.actionsWrapper}>
                  <UserActionLogs userActions={userActions} />
                  {/* <div className={votingClasses.action}>
               <span className={votingClasses.time}>
                  <span>20:22</span>
               </span>
               <span className={votingClasses.text}>
                  Image ID: <span>h4l1h543</span> was removed from fav
               </span>
            </div>
            <div className={votingClasses.action}>
               <span className={votingClasses.time}>
                  <span>20:22</span>
               </span>
               <span className={votingClasses.text}>
                  Image ID: <span>h4l1h543</span> was removed from fav
               </span>
            </div> */}
               </div>
               <Paginator getCurrentPage={getCurrentPage} getItemsCount={getTotalCount} getFilter={() => ({ limitItems: limit })} prevNext={prevNext} />
            </div>

         </div>
      }
      {
         isFetching &&
         <Preloader />
      }
   </>
}

export default FavouritiesPage