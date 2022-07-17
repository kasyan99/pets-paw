import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { votingAPI } from '../../../../api/voting-api';
import { actions, addToFavourite, BreedImageType, getRandomBreed, getVotes, setVote, UsersActionType } from '../../../../redux/voting-reducer';
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
         addUserAction(value)
         dispatch(getRandomBreed())
      }

      // dispatch(getVotes())
   }

   const addUserAction = (value: 0 | 1 | null) => {
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
      const hours = data.getHours() < 10 ? `0${data.getHours()}` : `${data.getHours()}`
      const minutes = data.getMinutes() < 10 ? `0${data.getMinutes()}` : `${data.getMinutes()}`

      const userAction: UsersActionType = {
         id: id,
         action: 'added',
         time: `${hours}:${minutes}`,
         type: type
      }

      dispatch(actions.addUserAction(userAction))
   }

   const toFavourite = () => {
      if (id)
         dispatch(addToFavourite(id))
      if (!isFetching) {
         addUserAction(null)
         dispatch(getRandomBreed())
      }

      // votingAPI.getFavourites()
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
               <button onClick={toFavourite}>favourite</button>
               <button onClick={() => onVote(0)}>dislike</button>
            </div>
         </div>
      </div>
      <div className={classes.actionsWrapper}>
         {createUserActions()}
      </div>
   </div>
}

export default VotingPage