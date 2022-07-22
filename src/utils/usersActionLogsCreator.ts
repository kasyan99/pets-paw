import { UsersActionType } from "../redux/voting-reducer"

export const addUserActionCreator = (usersActions: Array<UsersActionType>, removeUserAction: () => void, addUserAction: (userAction: UsersActionType) => void, maxLength = 4) => (id: string, value: 0 | 1 | null, action: 'add' | 'remove') => {
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

   if (usersActions.length >= maxLength) {
      removeUserAction()
   }

   const act = (() => {
      switch (action) {
         case 'add':
            return 'added to'
         default:
            return 'removed from'
      }
   })()

   const userAction: UsersActionType = {
      id: id,
      action: act,
      time: actualTime(),
      type: type
   }


   addUserAction(userAction)
}

const actualTime = () => {
   const data = new Date
   const hours = data.getHours() < 10 ? `0${data.getHours()}` : `${data.getHours()}`
   const minutes = data.getMinutes() < 10 ? `0${data.getMinutes()}` : `${data.getMinutes()}`

   return `${hours}:${minutes}`
}