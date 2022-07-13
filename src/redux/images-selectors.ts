import { AppStateType } from "./redux-store"

export const getImagesList = (state: AppStateType) => {
   return state.images.imagesList
}

export const getCurrentPage = (state: AppStateType) => {
   return state.images.currentPage
}

export const getFilter = (state: AppStateType) => {
   return state.images.filter
}

export const getImagesCount = (state: AppStateType) => {
   return state.images.totalImagesCount
}