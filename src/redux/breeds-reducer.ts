import { Dispatch } from "react"
import { breedsAPI } from "../api/breeds-api"
import { BreedsFilterFormType } from "../components/content/Pages/BreedsPage/BreedsFilterForm"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = 'pets-paw/breeds/SET-BREEDS-LIST'
// const SET_TOTAL_BREEDS_LIST = 'pets-paw/breeds/SET-TOTAL-BREEDS-LIST'
const SET_CURRENT_PAGE = 'pets-paw/breeds/SET-CURRENT-PAGE'
const SET_USERS_COUNT = 'pets-paw/breeds/SET-USERS-COUNT'
const SET_LIMIT_ITEMS = 'pets-paw/breeds/SET-LIMIT-ITEMS'
const SET_ORDER = 'pets-paw/breeds/SET-ORDER'
const SET_BREEDS_NAMES_LIST = 'pets-paw/breeds/SET-BREEDS-NAMES-LIST'
const SET_FILTER = 'pets-paw/breeds/SET-FILTER'
const TOGGLE_FETCH = 'pets-paw/breeds/TOGGLE-FETCH'
const SET_INFO_PHOTOS = 'pets-paw/breeds/SET-INFO-PHOTOS'
const SET_INFO_PHOTO_NUMBER = 'pets-paw/breeds/SET-INFO-PHOTO_NUMBER'
const SET_BREEDS_NUMBERS_BY_ID = 'pets-paw/breeds/SET-BREEDS-NUMBERS-BY-ID'

export type BreedsFilterType = {
   limitItems: number
   filterByBreed: string
}

const initialState = {
   breedsList: [] as Array<Object>,
   // totalBreedsList: [] as Array<any>,
   breedsCount: 0,
   filter: {
      limitItems: 5,
      filterByBreed: ''
   } as BreedsFilterType,
   currentPage: 0,
   order: 'ASC' as 'ASC' | 'DESC',
   breedsNamesList: {},
   isFetching: false,
   breedInfoPhotos: [] as Array<any>,
   infoPhotoNumber: 0,
   numbersById: {} as any
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
      // case SET_TOTAL_BREEDS_LIST:
      //    return {
      //       ...state,
      //       totalBreedsList: [...action.totalBreedsList]
      //    }
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
      case SET_INFO_PHOTOS:
         return {
            ...state,
            breedInfoPhotos: [...action.breedInfoPhotos]
         }
      case SET_INFO_PHOTO_NUMBER:
         return {
            ...state,
            infoPhotoNumber: action.infoPhotoNumber
         }
      case SET_BREEDS_NUMBERS_BY_ID:
         return {
            ...state,
            numbersById: { ...action.numbersById }
         }

      default:
         return state
   }
}

export const actions = {
   setBreedsList: (breedsList: Array<Object>) => ({ type: SET_BREEDS_LIST, breedsList } as const),
   // setTotalBreedsList: (totalBreedsList: Array<any>) => ({ type: SET_TOTAL_BREEDS_LIST, totalBreedsList } as const),
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setBreedsCount: (breedsCount: number) => ({ type: SET_USERS_COUNT, breedsCount } as const),
   setLimitItems: (limitItems: number) => ({ type: SET_LIMIT_ITEMS, limitItems } as const),
   setOrder: (order: 'ASC' | 'DESC') => ({ type: SET_ORDER, order } as const),
   setBreedsNamesList: (breedsNamesList: Object) => ({ type: SET_BREEDS_NAMES_LIST, breedsNamesList } as const),
   setByBreed: (filterByBreed: string) => ({ type: SET_FILTER, filterByBreed } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCH, isFetching } as const),
   setInfoPhotos: (breedInfoPhotos: Array<string>) => ({ type: SET_INFO_PHOTOS, breedInfoPhotos } as const),
   setInfoPhotoNumber: (infoPhotoNumber: number) => ({ type: SET_INFO_PHOTO_NUMBER, infoPhotoNumber } as const),
   setBreedsNumbersById: (numbersById: any) => ({ type: SET_BREEDS_NUMBERS_BY_ID, numbersById } as const),
}

export const getBreedsListThunk = (values: BreedsFilterFormType, page: number | null, order = 'ASC' as 'ASC' | 'DESC'): ThunkType => async (dispatch) => {

   dispatch(actions.toggleIsFetching(true))

   const { filterByBreed, limitItems } = values
   let response
   if (filterByBreed !== '') {
      // response = await breedsAPI.getByBreed(filterByBreed)
      const allBreeds = await breedsAPI.getBreads(null, null)

      response = allBreeds.filter((item: any) => item.id === filterByBreed)
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
   console.log('breeds', breeds);

   // dispatch(actions.setTotalBreedsList(breeds))
   dispatch(actions.setBreedsNamesList(breedsNamesList))
}

export const getTotalBreedsCount = (): any => async (dispatch: any) => {
   const headers = (await breedsAPI.getTotalBreeds()).headers
   const breedsCount = Number(headers['pagination-count'])

   dispatch(actions.setBreedsCount(breedsCount))
}

export const getBreedsNumbersById = (): any => async (dispatch: any) => {

   const data = (await breedsAPI.getTotalBreeds()).data

   if (data) {
      let arr = {} as any

      data.map((breed: any, index: number) => {
         arr[`${breed.id}`] = index + 1
      })

      dispatch(actions.setBreedsNumbersById(arr))
   }

}

export const getBreedById = (id: string): any => async (dispatch: any) => {
   dispatch(actions.toggleIsFetching(true))

   const breedPhotos = await breedsAPI.getByBreed(id)
   dispatch(actions.setInfoPhotos(breedPhotos))

   dispatch(actions.toggleIsFetching(false))

}

export default breedsReducer