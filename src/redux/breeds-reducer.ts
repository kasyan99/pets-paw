import { breedsAPI } from "../api/breeds-api"
import { BreedsFilterFormType } from "../components/content/Pages/BreedsPage/BreedsFilterForm"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = 'pets-paw/breeds/SET-BREEDS-LIST'
const SET_CURRENT_PAGE = 'pets-paw/breeds/SET-CURRENT-PAGE'
const SET_USERS_COUNT = 'pets-paw/breeds/SET-USERS-COUNT'
const SET_LIMIT_ITEMS = 'pets-paw/breeds/SET-LIMIT-ITEMS'
const SET_ORDER = 'pets-paw/breeds/SET-ORDER'
const SET_BREEDS_NAMES_LIST = 'pets-paw/breeds/SET-BREEDS-NAMES-LIST'
const SET_FILTER = 'pets-paw/breeds/SET-FILTER'

export type InitialStateType = {
   breedsList: Array<Object>
   usersCount: number
   currentPage: number
   filter: {
      limitItems: number
      filterByBreed: string
   },
   order: 'ASC' | 'DESC',
   breedsNamesList: Object
}

const initialState: InitialStateType = {
   breedsList: [],
   usersCount: 70,
   filter: {
      limitItems: 5,
      filterByBreed: ''
   },
   currentPage: 0,
   order: 'ASC',
   breedsNamesList: {}
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
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage
         }
      case SET_USERS_COUNT:
         return {
            ...state,
            usersCount: action.usersCount
         }
      case SET_LIMIT_ITEMS:
         return {
            ...state,
            filter: { ...state.filter, limitItems: action.limitItems }
         }
      case SET_FILTER:
         return {
            ...state,
            filter: { ...state.filter, filterByBreed: action.filterByBreed }
         }
      case SET_ORDER:
         return {
            ...state,
            order: action.order
         }
      case SET_BREEDS_NAMES_LIST:
         return {
            ...state,
            breedsNamesList: { ...action.breedsNamesList }
         }
      default:
         return state
   }
}

export const actions = {
   setBreedsList: (breedsList: Array<Object>) => ({ type: SET_BREEDS_LIST, breedsList } as const),
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setUsersCount: (usersCount: number) => ({ type: SET_USERS_COUNT, usersCount } as const),
   setLimitItems: (limitItems: number) => ({ type: SET_LIMIT_ITEMS, limitItems } as const),
   setOrder: (order: 'ASC' | 'DESC') => ({ type: SET_ORDER, order } as const),
   setBreedsNamesList: (breedsNamesList: Object) => ({ type: SET_BREEDS_NAMES_LIST, breedsNamesList } as const),
   setByBreed: (filterByBreed: string) => ({ type: SET_FILTER, filterByBreed } as const),
}

export const getBreedsListThunk = (values: BreedsFilterFormType, page: number | null, order = 'ASC' as 'ASC' | 'DESC'): any => async (dispatch: any) => {

   const { filterByBreed, limitItems } = values
   let response
   if (filterByBreed !== '') {
      response = await breedsAPI.getByBreed(filterByBreed)
   } else {

      response = await breedsAPI.getBreads(limitItems, page, order)

      await dispatch(actions.setOrder(order))
      // const breeds = await breedsAPI.getBreads(null, null)
      if (limitItems) {
         await dispatch(actions.setLimitItems(limitItems))
      }
      // await dispatch(actions.setUsersCount(breeds.length))
      if (page || page === 0) {
         await dispatch(actions.setCurrentPage(page))
      }
   }
   await dispatch(actions.setByBreed(filterByBreed))
   dispatch(actions.setBreedsList(response))

}

export const getBreedsListNamesThunk = (): any => async (dispatch: any) => {
   const breeds = await breedsAPI.getBreads(null, null)

   let breedsNamesList: any = {}
   breeds.map(((breed: any) => {
      breedsNamesList[breed.id] = breed.name
   }))

   dispatch(actions.setBreedsNamesList(breedsNamesList))
}

export default breedsReducer