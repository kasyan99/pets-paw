import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteVote, getVotesList } from '../../../../redux/likes-reducer';
import { getIsFetching, getLikedImagesList } from '../../../../redux/likes-selectors';
import breedClasses from '../BreedsPage/BreedsPage.module.scss'
import Preloader from '../../../common/Preloader';
import NoItemFound from '../../../common/NoItemFound';
import { getIsBlack } from '../../../../redux/theme-selectors';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { IImage } from '../../../../models/models';


//it will be LikesPage if value = 1, DislikesPage if value = 0
const LikesPage: React.FC<{ value: 0 | 1 }> = ({ value }) => {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getVotesList(value))
   }, [value])

   const likesList: IImage[] = Object.values(useSelector(getLikedImagesList))

   const isFetching = useSelector(getIsFetching)

   const removeLikedImage = (vote_id: string) => {
      dispatch(deleteVote(vote_id))
   }

   const imagesList = () => {

      if (likesList.length > 0) {
         return likesList.map((image: IImage) => {

            return <div className={`${breedClasses.grid__item} ${breedClasses.grid__item_gallery}`}
               key={image.id}>
               <img src={image.url} alt={image.id} />
               <div><button onClick={() => {
                  removeLikedImage(String(image.vote_id));
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
         </div>
      }
      {isFetching &&
         <Preloader />}
   </>
}

export default LikesPage

