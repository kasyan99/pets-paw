import { breedsAPI } from "../api/breeds-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = 'pets-paw/search/SET-BREEDS-LIST'
const TOGGLE_FETCHING = 'pets-paw/search/TOGGLE-FETCHING'
const SET_BREED_NAME = 'pets-paw/search/SET-BREED-NAME'

const initialState = {
   breedsList: [] as Array<any>,
   isFetching: false,
   breedName: ''
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
      case SET_BREED_NAME:
         return {
            ...state,
            breedName: action.breedName
         }
      default:
         return state
   }
}

export const actions = {
   setBreedsList: (breedsList: Array<Object>) => ({ type: SET_BREEDS_LIST, breedsList } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
   setBreedName: (breedName: string) => ({ type: SET_BREED_NAME, breedName } as const),
}

export const getBreadsByName = (name: string): ThunkType => async (dispatch) => {

   dispatch(actions.toggleIsFetching(true))
   dispatch(actions.setBreedName(name))
   const breedsListByName = breedsAPI.getBreadByName(name)
   const listOfAllBreeds = breedsAPI.getTotalBreeds()

   await breedsListByName.then((data: any) => {
      const listIds = data.map((item: any) => item.id)

      listOfAllBreeds.then((data: any) => {
         const searchedBreedsList = data.data.filter((breed: any) => listIds.includes(breed.id))
         dispatch(actions.setBreedsList(searchedBreedsList))
      })

   })
   // breedsList.then((data: any) => dispatch(actions.setBreedsList(data)))

   dispatch(actions.toggleIsFetching(false))

}

export default searchReducer