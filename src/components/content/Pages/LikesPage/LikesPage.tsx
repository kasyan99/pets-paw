import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVote, getVotesList } from '../../../../redux/likes-reducer';
import { getIsFetching, getLikedImagesList } from '../../../../redux/likes-selectors';
import classes from './LikesPage.module.scss'
import breedClasses from '../BreedsPage/BreedsPage.module.scss'
import votingClasses from '../VotingPage/VotingPage.module.scss'
import Preloader from '../../../common/Preloader';
import NoItemFound from '../../../common/NoItemFound';
import { getIsBlack } from '../../../../redux/theme-selectors';

//it will be LikesPage if value = 1, DislikesPage if value = 0
const LikesPage: React.FC<{ value: 0 | 1 }> = ({ value }) => {
   const dispatch = useDispatch<any>()

   useEffect(() => {
      dispatch(getVotesList(value))
   }, [value])

   const likesList = Object.values(useSelector(getLikedImagesList))

   const isFetching = useSelector(getIsFetching)

   const removeLikedImage = (vote_id: string) => {
      dispatch(deleteVote(vote_id))
   }

   const imagesList = () => {

      if (likesList.length > 0) {
         return likesList.map((image: any) => {
            // const fav_id = breed.id
            return <div className={`${breedClasses.grid__item} ${breedClasses.grid__item_gallery}`}
               key={image.id}>
               <img src={image.url} alt={image.id} />
               <div><button onClick={() => {
                  removeLikedImage(image.vote_id);
                  // addUserAction(breed.image.id, null, 'remove') 
               }} className={value === 1 ? breedClasses.remove_from_likes : breedClasses.remove_from_dislikes}>remove from {value === 1 ? 'likes' : 'dislikes'}</button>
               </div>
            </div>
         })

      } else {
         return <></>
      }
   }

   const isBlack = useSelector(getIsBlack)

   return <>
      {likesList.length === 0 &&
         <NoItemFound />}
      {!isFetching &&
         <div className={breedClasses.breedsList}>
            <div className={`${breedClasses.grid__layout} ${isBlack && breedClasses.black}`}>
               {imagesList()}
            </div>
            <div className={breedClasses.bottomWrapper}>
               <div className={votingClasses.actionsWrapper}>
                  {/* <UserActionLogs userActions={userActions} /> */}
               </div>
               {/* <Paginator getCurrentPage={getCurrentPage} getItemsCount={getTotalCount} getFilter={() => ({ limitItems: limit })} prevNext={prevNext} /> */}
            </div>

         </div>
      }
      {isFetching &&
         <Preloader />}
   </>
}

export default LikesPage

