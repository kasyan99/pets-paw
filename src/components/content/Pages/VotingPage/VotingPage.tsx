import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, BreedImageType, getRandomBreed, getVotes, setVote, UsersActionType } from '../../../../redux/voting-reducer';
import { getBreedImage, getIsFetching, getUserActions } from '../../../../redux/voting-selectors';
import Preloader from '../../../common/Preloader';
import classes from './VotingPage.module.scss'


const VotingPage: React.FC = () => {
   const isFetching = useSelector(getIsFetching)
   const dispatch = useDispatch<any>()

   useEffect(() => {
      dispatch(getRandomBreed())
   }, [])


   const breedImage: BreedImageType = useSelector(getBreedImage)
   const url = breedImage.url ? breedImage.url : ''
   const id = breedImage.id ? breedImage.id : ''

   const usersActions = useSelector(getUserActions)
   const onVote = (value: 0 | 1) => {
      if (id)
         dispatch(setVote(id, value))
      if (!isFetching) {
         dispatch(getRandomBreed())

         const type = (() => {
            switch (value) {
               case 0:
                  return 'Dislikes'
               case 1:
                  return 'Likes'
               default:
                  return 'Favourites'
            }
         })()

         if (usersActions.length > 3) {
            dispatch(actions.removeUserAction())
         }

         const data = new Date

         const userAction: UsersActionType = {
            id: id,
            action: 'addes',
            time: `${data.getHours()}:${data.getMinutes()}`,
            type: type
         }

         dispatch(actions.addUserAction(userAction))
      }

      // dispatch(getVotes())
   }

   const userActions = useSelector(getUserActions)

   const createUserActions = () => {
      if (userActions) {
         return userActions.map((action, index) => {
            return <div className={classes.action} key={index}>
               <span className={classes.time}>
                  <span>{action.time}</span>
               </span>
               <span className={classes.text}>
                  Image ID: <span>{action.id}</span> was {action.action} to {action.type}
               </span>
            </div>
         })
      }
      else {
         return ''
      }
   }

   return <div className={classes.votingPage}>
      <div className={classes.imagesWrapper}>
         {!isFetching &&
            <img src={url} alt="" />}
         {isFetching &&
            <Preloader />}
         <div className={classes.btnContainer}>
            <div>
               <button onClick={() => onVote(1)}>like</button>
               <button>favourite</button>
               <button onClick={() => onVote(0)}>dislike</button>
            </div>
         </div>
      </div>
      <div className={classes.actionsWrapper}>
         {createUserActions()}
         {/* <div className={classes.action}>
            <span className={classes.time}>
               <span>22:35</span>
            </span>
            <span className={classes.text}>
               Image ID: <span>fQSunHvl8</span> was added to Favourites
            </span>
         </div> */}
      </div>
   </div>
}

export default VotingPage