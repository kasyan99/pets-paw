import { breedsAPI } from "../api/breeds-api"
import { BreedsFilterFormType } from "../components/content/Pages/BreedsPage"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = 'pets-paw/breeds/SET-BREEDS-LIST'

export type InitialStateType = {
   breedsList: Array<Object>
}

const initialState: InitialStateType = {
   breedsList: []
}

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const breedsReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_BREEDS_LIST:
         return {
            ...state,
            breedsList: [...action.breedsList]
         }
      default:
         return state
   }
}

export const actions = {
   setBreedsList: (breedsList: Array<Object>) => ({ type: SET_BREEDS_LIST, breedsList } as const)
}

export const getBreedsListThunk = (values: BreedsFilterFormType): any => async (dispatch: any) => {

   const { filterByBreed, limitItems } = values
   const response = await breedsAPI.getBreads(limitItems, '0', filterByBreed)

   dispatch(actions.setBreedsList(response))
}

export default breedsReducer