import { AppStateType } from "./redux-store"

export const getFavList = (state: AppStateType) => {
   return state.favourites.favouritesList
}

export const getCurrentPage = (state: AppStateType) => {
   return state.favourites.currentPage
}

export const getLimit = (state: AppStateType) => {
   return state.favourites.limit
}

export const getIsFetching = (state: AppStateType) => {
   return state.favourites.isFetching
}

export const getTotalCount = (state: AppStateType) => {
   return state.favourites.totalImagesCount
}

export const getUserActions = (state: AppStateType) => {
   return state.favourites.userActions
}