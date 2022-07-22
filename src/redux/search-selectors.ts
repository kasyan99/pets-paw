import { AppStateType } from "./redux-store"

export const getBreedsByname = (state: AppStateType) => {
   return state.search.breedsList
}

export const getIsFetching = (state: AppStateType) => {
   return state.search.isFetching
}

export const getBreedName = (state: AppStateType) => {
   return state.search.breedName
}




