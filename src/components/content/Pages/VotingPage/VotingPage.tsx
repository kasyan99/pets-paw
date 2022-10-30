import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { getIsBlack } from '../../../../redux/theme-selectors';
import { actions, addToFavourite, BreedImageType, getRandomBreed, setVote, UsersActionType } from '../../../../redux/voting-reducer';
import { getBreedImage, getIsFetching, getUserActions } from '../../../../redux/voting-selectors';
import { addUserActionCreator } from '../../../../utils/usersActionLogsCreator';
import Preloader from '../../../common/Preloader';
import classes from './VotingPage.module.scss'


const VotingPage: React.FC = () => {
   const isFetching = useSelector(getIsFetching)
   const dispatch = useAppDispatch()

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
         addUserAction(id, value, 'add')
         dispatch(getRandomBreed())
      }
   }
   const addUserAction = addUserActionCreator(usersActions, () => dispatch(actions.removeUserAction()), (userAction) => dispatch(actions.addUserAction(userAction)))


   const toFavourite = () => {
      if (id)
         dispatch(addToFavourite(id))
      if (!isFetching) {
         addUserAction(id, null, 'add')
         dispatch(getRandomBreed())
      }
   }

   const userActions = useSelector(getUserActions)
   const isBlack = useSelector(getIsBlack)

   return <div className={`${classes.votingPage} ${isBlack && classes.black}`}>
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
      <div className={`${classes.actionsWrapper} ${isBlack && classes.black}`}>
         <UserActionLogs userActions={userActions} />
      </div>
   </div>
}

export const UserActionLogs: React.FC<{ userActions: UsersActionType[] }> = ({ userActions }) => {
   const createUserActions = (userActions: UsersActionType[] | null) => {
      if (userActions) {
         return userActions.map((action, index) => {
            return <div className={`${classes.action} ${action.action === 'added to' && classes[`action_${action.type}`]}`} key={index}>
               <span className={classes.time}>
                  <span>{action.time}</span>
               </span>
               <span className={classes.text}>
                  Image ID: <span>{action.id}</span> was {action.action} {action.type}
               </span>
            </div>
         })
      }
      else {
         return ''
      }
   }

   return <>{createUserActions(userActions)}</>
}

export default VotingPage