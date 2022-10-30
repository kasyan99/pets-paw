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

export const getIsFetching = (state: AppStateType) => {
  return state.images.isFetching
}

// export const getDisFav = (state: AppStateType) => {
//    return state.images.displayedFavourites
// }
