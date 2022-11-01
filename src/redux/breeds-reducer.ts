import { Dispatch } from "react"
import { breedsAPI } from "../api/breeds-api"
import { BreedsFilterFormType } from "../components/content/Pages/BreedsPage/BreedsFilterForm"
import { BreedsNumberById, IBreed, IImage } from "../models/models"
import { AppDispatch, BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREEDS_LIST = "pets-paw/breeds/SET-BREEDS-LIST"
const SET_CURRENT_PAGE = "pets-paw/breeds/SET-CURRENT-PAGE"
const SET_USERS_COUNT = "pets-paw/breeds/SET-USERS-COUNT"
const SET_LIMIT_ITEMS = "pets-paw/breeds/SET-LIMIT-ITEMS"
const SET_ORDER = "pets-paw/breeds/SET-ORDER"
const SET_BREEDS_NAMES_LIST = "pets-paw/breeds/SET-BREEDS-NAMES-LIST"
const SET_FILTER = "pets-paw/breeds/SET-FILTER"
const TOGGLE_FETCH = "pets-paw/breeds/TOGGLE-FETCH"
const SET_INFO_PHOTOS = "pets-paw/breeds/SET-INFO-PHOTOS"
const SET_INFO_PHOTO_NUMBER = "pets-paw/breeds/SET-INFO-PHOTO_NUMBER"
const SET_BREEDS_NUMBERS_BY_ID = "pets-paw/breeds/SET-BREEDS-NUMBERS-BY-ID"

export type BreedsFilterType = {
  limitItems: number
  filterByBreed: string
}

const initialState = {
  breedsList: [] as IBreed[],
  breedsCount: 0,
  filter: {
    limitItems: 5,
    filterByBreed: "",
  } as BreedsFilterType,
  currentPage: 0,
  order: "ASC" as "ASC" | "DESC",
  breedsNamesList: {} as { [key: string]: string },
  isFetching: false,
  breedInfoPhotos: [] as IImage[],
  infoPhotoNumber: 0,
  numbersById: {} as BreedsNumberById,
}

export type InitialStateType = typeof initialState

export type ActionsBreedsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsBreedsType>

const breedsReducer = (
  state = initialState,
  action: ActionsBreedsType
): InitialStateType => {
  switch (action.type) {
    case SET_BREEDS_LIST:
      return {
        ...state,
        breedsList: [...action.breedsList],
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_USERS_COUNT:
      return {
        ...state,
        breedsCount: action.breedsCount,
      }
    case SET_LIMIT_ITEMS:
      return {
        ...state,
        filter: { ...state.filter, limitItems: action.limitItems },
      }
    case SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, filterByBreed: action.filterByBreed },
      }
    case SET_ORDER:
      return {
        ...state,
        order: action.order,
      }
    case SET_BREEDS_NAMES_LIST:
      return {
        ...state,
        breedsNamesList: { ...action.breedsNamesList },
      }
    case TOGGLE_FETCH:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case SET_INFO_PHOTOS:
      return {
        ...state,
        breedInfoPhotos: [...action.breedInfoPhotos],
      }
    case SET_INFO_PHOTO_NUMBER:
      return {
        ...state,
        infoPhotoNumber: action.infoPhotoNumber,
      }
    case SET_BREEDS_NUMBERS_BY_ID:
      return {
        ...state,
        numbersById: { ...action.numbersById },
      }

    default:
      return state
  }
}

export const actions = {
  setBreedsList: (breedsList: IBreed[]) =>
    ({ type: SET_BREEDS_LIST, breedsList } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, currentPage } as const),
  setBreedsCount: (breedsCount: number) =>
    ({ type: SET_USERS_COUNT, breedsCount } as const),
  setLimitItems: (limitItems: number) =>
    ({ type: SET_LIMIT_ITEMS, limitItems } as const),
  setOrder: (order: "ASC" | "DESC") => ({ type: SET_ORDER, order } as const),
  setBreedsNamesList: (breedsNamesList: { [key: string]: string }) =>
    ({ type: SET_BREEDS_NAMES_LIST, breedsNamesList } as const),
  setByBreed: (filterByBreed: string) =>
    ({ type: SET_FILTER, filterByBreed } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_FETCH, isFetching } as const),
  setInfoPhotos: (breedInfoPhotos: IImage[]) =>
    ({ type: SET_INFO_PHOTOS, breedInfoPhotos } as const),
  setInfoPhotoNumber: (infoPhotoNumber: number) =>
    ({ type: SET_INFO_PHOTO_NUMBER, infoPhotoNumber } as const),
  setBreedsNumbersById: (numbersById: BreedsNumberById) =>
    ({ type: SET_BREEDS_NUMBERS_BY_ID, numbersById } as const),
}

export const getBreedsListThunk =
  (
    values: BreedsFilterFormType,
    page: number | null,
    order = "ASC" as "ASC" | "DESC"
  ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))

    const { filterByBreed, limitItems } = values
    let response
    if (filterByBreed !== "") {
      const allBreeds: IBreed[] = await breedsAPI.getBreads(null, null)

      response = allBreeds.filter((item) => item.id === filterByBreed)
    } else {
      response = await breedsAPI.getBreads(limitItems, page, order)

      dispatch(actions.setOrder(order))
      if (limitItems) {
        dispatch(actions.setLimitItems(limitItems))
      }
      if (page || page === 0) {
        dispatch(actions.setCurrentPage(page))
      }
    }
    dispatch(actions.setByBreed(filterByBreed))
    dispatch(actions.setBreedsList(response))

    dispatch(actions.toggleIsFetching(false))
  }

export const getBreedsListNamesThunk =
  () => async (dispatch: Dispatch<ActionsBreedsType>) => {
    const breeds: IBreed[] = await breedsAPI.getBreads(null, null)

    let breedsNamesList: { [key: string]: string } = {}
    breeds.forEach((breed) => (breedsNamesList[breed.id] = breed.name))
    dispatch(actions.setBreedsNamesList(breedsNamesList))
  }

export const getTotalBreedsCount = () => async (dispatch: AppDispatch) => {
  const headers = (await breedsAPI.getTotalBreeds()).headers
  const breedsCount = Number(headers["pagination-count"])

  dispatch(actions.setBreedsCount(breedsCount))
}

export const getBreedsNumbersById = () => async (dispatch: AppDispatch) => {
  const data: IBreed[] = (await breedsAPI.getTotalBreeds()).data

  if (data) {
    let arr = {} as BreedsNumberById

    data.forEach((breed, index) => (arr[`${breed.id}`] = index + 1))

    dispatch(actions.setBreedsNumbersById(arr))
  }
}

export const getBreedById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(actions.toggleIsFetching(true))

  const breedPhotos: IImage[] = await breedsAPI.getByBreed(id)
  console.log("breedPhotos", breedPhotos)

  dispatch(actions.setInfoPhotos(breedPhotos))

  dispatch(actions.toggleIsFetching(false))
}

export default breedsReducer
