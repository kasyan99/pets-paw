import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVote, getLikesList } from '../../../../redux/likes-reducer';
import { getLikedImagesList } from '../../../../redux/likes-selectors';
import classes from './LikesPage.module.scss'
import breedClasses from '../BreedsPage/BreedsPage.module.scss'
import votingClasses from '../VotingPage/VotingPage.module.scss'

const LikesPage: React.FC = () => {
   const dispatch = useDispatch<any>()

   useEffect(() => {
      dispatch(getLikesList())
   }, [])

   const likesList = Object.values(useSelector(getLikedImagesList))

   console.log(likesList);
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
               }} className={breedClasses.remove_from_likes}>remove from likes</button>
               </div>
            </div>
         })

      } else {
         return <></>
      }
   }

   return <div className={breedClasses.breedsList}>
      <div className={breedClasses.grid__layout}>
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

export default LikesPage

