import { AppStateType } from "./redux-store"

export const getCurrentPage = (state: AppStateType) => {
   return state.likes.currentPage
}

export const getLimit = (state: AppStateType) => {
   return state.likes.limit
}

export const getIsFetching = (state: AppStateType) => {
   return state.likes.isFetching
}

export const getTotalCount = (state: AppStateType) => {
   return state.likes.totalImagesCount
}

export const getUserActions = (state: AppStateType) => {
   return state.likes.userActions
}

export const getLikedImagesList = (state: AppStateType) => {
   return state.likes.likesList
}