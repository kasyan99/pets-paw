import { AppStateType } from "./redux-store"

export const getBreedsList = (state: AppStateType) => {
   return state.breeds.breedsList
}

export const getCurrentPage = (state: AppStateType) => {
   return state.breeds.currentPage
}

export const getFilter = (state: AppStateType) => {
   return state.breeds.filter
}

export const getBreedsCount = (state: AppStateType) => {
   return state.breeds.breedsCount
}

export const getOrder = (state: AppStateType) => {
   return state.breeds.order
}

export const getBreedsNamesList = (state: AppStateType) => {
   return state.breeds.breedsNamesList
}

export const getIsFetching = (state: AppStateType) => {
   return state.breeds.isFetching
}