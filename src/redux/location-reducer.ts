// import { BaseThunkType, InferActionsTypes } from "./redux-store"

// const SET_CURRENT_LOCATION = 'pets-paw/location/SET-CURRENT-LOCATION'
// const SET_PREVIOUS_LOCATION = 'pets-paw/location/SET-PREVIOUS-LOCATION'

// const initialState = {
//    currentLocation: '',
//    previousLocation: ''
// }

// export type InitialStateType = typeof initialState

// type ActionsType = InferActionsTypes<typeof actions>
// type ThunkType = BaseThunkType<ActionsType>

// const locationReducer = (state = initialState, action: ActionsType): InitialStateType => {
//    switch (action.type) {
//       case SET_CURRENT_LOCATION:
//          return {
//             ...state,
//             currentLocation: action.currentLocation
//          }
//       case SET_PREVIOUS_LOCATION:
//          return {
//             ...state,
//             previousLocation: action.previousLocation
//          }
//       default:
//          return state
//    }
// }

// export const actions = {
//    setCurrentlocation: (currentLocation: string) => ({ type: SET_CURRENT_LOCATION, currentLocation } as const),
//    setPreviouslocation: (previousLocation: string) => ({ type: SET_PREVIOUS_LOCATION, previousLocation } as const),
// }

// // export const deleteVote = (vote_id: string): ThunkType => async (dispatch) => {
// // }

// export default locationReducer


import { BaseThunkType, InferActionsTypes } from "./redux-store"

const ADD_LOCATION = 'pets-paw/location/ADD-LOCATION'
const REMOVE_LOCATION = 'pets-paw/location/REMOVE-LOCATION'
const SET_CURRENT_LOCATION = 'pets-paw/location/SET-CURRENT-LOCATION'
const SET_IS_BACK = 'pets-paw/location/SET-IS-BACK'

const initialState = {
   currentLocation: 0,
   locationList: [] as Array<string>,
   isBack: false
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const locationReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_CURRENT_LOCATION:
         return {
            ...state,
            currentLocation: action.currentLocation
         }
      case ADD_LOCATION:
         return {
            ...state,
            locationList: [...state.locationList, action.location]
         }
      case REMOVE_LOCATION:
         const newList = [...state.locationList]
         newList.pop()
         return {
            ...state,
            locationList: [...newList]
         }
      case SET_IS_BACK:
         return {
            ...state,
            isBack: action.isBack
         }
      default:
         return state
   }
}

export const actions = {
   setCurrentlocation: (currentLocation: number) => ({ type: SET_CURRENT_LOCATION, currentLocation } as const),
   addLocation: (location: string) => ({ type: ADD_LOCATION, location } as const),
   removeLocation: () => ({ type: REMOVE_LOCATION } as const),
   setIsBack: (isBack: boolean) => ({ type: SET_IS_BACK, isBack } as const),
}

// export const deleteVote = (vote_id: string): ThunkType => async (dispatch) => {
// }

export default locationReducer