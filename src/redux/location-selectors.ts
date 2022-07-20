import { AppStateType } from "./redux-store"

export const getCurrentLocation = (state: AppStateType) => {
   return state.location.currentLocation
}

// export const getPrevioustLocation = (state: AppStateType) => {
//    return state.location.previousLocation
// }

export const getLocationList = (state: AppStateType) => {
   return state.location.locationList
}

export const getIsBack = (state: AppStateType) => {
   return state.location.isBack
}