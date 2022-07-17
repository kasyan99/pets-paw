import { AppStateType } from "./redux-store"

export const getBreedImage = (state: AppStateType) => {
   return state.voting.breedImage
}

export const getIsFetching = (state: AppStateType) => {
   return state.voting.isFetching
}

export const getUserActions = (state: AppStateType) => {
   return state.voting.userActions
}

export const getFavouritesList = (state: AppStateType) => {
   return state.voting.favourites
}

