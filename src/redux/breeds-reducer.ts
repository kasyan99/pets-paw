import { Dispatch } from "react"
import { AnyAction } from "redux"
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
const TOGGLE_FETCH = 'pets-paw/breeds/TOGGLE-FETCH'

// export type InitialStateType = {
//    breedsList: Array<Object>
//    usersCount: number
//    currentPage: number
//    filter: {
//       limitItems: number
//       filterByBreed: string
//    },
//    order: 'ASC' | 'DESC',
//    breedsNamesList: Object
//    isFetching: boolean
// }

const initialState = {
   breedsList: [] as Array<Object>,
   breedsCount: 0,
   filter: {
      limitItems: 5,
      filterByBreed: ''
   },
   currentPage: 0,
   order: 'ASC' as 'ASC' | 'DESC',
   breedsNamesList: {},
   isFetching: false,
}

export type InitialStateType = typeof initialState

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
            breedsCount: action.breedsCount
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
      case TOGGLE_FETCH:
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
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setBreedsCount: (breedsCount: number) => ({ type: SET_USERS_COUNT, breedsCount } as const),
   setLimitItems: (limitItems: number) => ({ type: SET_LIMIT_ITEMS, limitItems } as const),
   setOrder: (order: 'ASC' | 'DESC') => ({ type: SET_ORDER, order } as const),
   setBreedsNamesList: (breedsNamesList: Object) => ({ type: SET_BREEDS_NAMES_LIST, breedsNamesList } as const),
   setByBreed: (filterByBreed: string) => ({ type: SET_FILTER, filterByBreed } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCH, isFetching } as const)
}

export const getBreedsListThunk = (values: BreedsFilterFormType, page: number | null, order = 'ASC' as 'ASC' | 'DESC'): ThunkType => async (dispatch) => {

   dispatch(actions.toggleIsFetching(true))

   const { filterByBreed, limitItems } = values
   let response
   if (filterByBreed !== '') {
      response = await breedsAPI.getByBreed(filterByBreed)
   } else {

      response = await breedsAPI.getBreads(limitItems, page, order)

      dispatch(actions.setOrder(order))
      // const breeds = await breedsAPI.getBreads(null, null)
      if (limitItems) {
         dispatch(actions.setLimitItems(limitItems))
      }
      // await dispatch(actions.setUsersCount(breeds.length))
      if (page || page === 0) {
         dispatch(actions.setCurrentPage(page))
      }
   }
   dispatch(actions.setByBreed(filterByBreed))
   dispatch(actions.setBreedsList(response))

   dispatch(actions.toggleIsFetching(false))

}

export const getBreedsListNamesThunk = (): any => async (dispatch: Dispatch<ActionsType>) => {
   const breeds = await breedsAPI.getBreads(null, null)

   let breedsNamesList: any = {}
   breeds.map(((breed: any) => {
      breedsNamesList[breed.id] = breed.name
   }))

   dispatch(actions.setBreedsNamesList(breedsNamesList))
}

export const getTotalBreedsCount = (): any => async (dispatch: any) => {
   const headers = await breedsAPI.getTotalBreedsCount()
   const breedsCount = Number(headers['pagination-count'])

   dispatch(actions.setBreedsCount(breedsCount))
}

export default breedsReducer