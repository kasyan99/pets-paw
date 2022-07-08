import { AppStateType } from "./redux-store"

export const getBreedsList = (state: AppStateType) => {
   return state.breeds.breedsList
}
