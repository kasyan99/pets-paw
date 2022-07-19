import { breedsAPI } from "../api/breeds-api"
import { imagesAPI } from "../api/images-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = 'pets-paw/search/SET-BREEDS-LIST'
const TOGGLE_FETCHING = 'pets-paw/search/TOGGLE-FETCHING'

const initialState = {
   breedsList: [] as Array<any>,
   isFetching: false
}

export type InitialStateType = typeof initialState

export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>

const searchReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_BREEDS_LIST:
         return {
            ...state,
            breedsList: [...action.breedsList]
         }
      case TOGGLE_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }
      default:
         return state
   }
}

export const actions = {
   setBreedsList: (breedsList: Array<Object>) => ({ type: SET_BREEDS_LIST, breedsList } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
}

export const getBreadsByName = (name: string): ThunkType => async (dispatch) => {

   dispatch(actions.toggleIsFetching(true))
   const breedsListByName = breedsAPI.getBreadByName(name)
   const listOfAllBreeds = breedsAPI.getTotalBreeds()

   await breedsListByName.then((data: any) => {
      const listIds = data.map((item: any) => item.id)

      listOfAllBreeds.then((data: any) => {
         const searchedBreedsList = data.data.filter((breed: any) => listIds.includes(breed.id))
         // console.log(searchedBreedsList);
         dispatch(actions.setBreedsList(searchedBreedsList))
      })

   })
   // breedsList.then((data: any) => dispatch(actions.setBreedsList(data)))

   dispatch(actions.toggleIsFetching(false))

}

export default searchReducer