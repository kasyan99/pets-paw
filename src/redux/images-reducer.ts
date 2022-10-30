import { imagesAPI } from "../api/images-api"
import { IBreed } from "../models/models"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_CURRENT_PAGE = "pets-paw/images/SET-CURRENT-PAGE"
const SET_FILTER = "pets-paw/images/SET-FILTER"
const SET_TOTAL_IMAGES_COUNT = "pets-paw/images/SET-TOTAL-IMAGES-COUNT"
const SET_IMAGES_LIST = "pets-paw/images/SET-IMAGES-LIST"
const TOGGLE_FETCHING = "pets-paw/images/TOGGLE-FETCHING"
const ADD_DISPLAYED_FAV = "pets-paw/voting/ADD-DISPLAYED-FAV"
const REMOVE_DISPLAYED_FAV = "pets-paw/voting/REMOVE-DISPLAYED-FAV"

export type OrderType = "ASC" | "DESC" | "RANDOM"
export type ImgTypeType = "all" | "static" | "animated"

export type GalleryFilterFormType = {
  order: OrderType
  filterByBreed: string
  limitItems: number
  type: ImgTypeType
}

const initialState = {
  filter: {
    order: "ASC",
    filterByBreed: "",
    limitItems: 5,
    type: "all",
  } as GalleryFilterFormType,
  currentPage: 0,
  totalImagesCount: 0,
  imagesList: [] as IBreed[],
  isFetching: false,
  // displayedFavourites: [] as Array<any>,
}

export type InitialStateType = typeof initialState

export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>

const imagesReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_FILTER:
      return {
        ...state,
        filter: { ...action.filter },
      }
    case SET_TOTAL_IMAGES_COUNT:
      return {
        ...state,
        totalImagesCount: action.totalImagesCount,
      }
    case SET_IMAGES_LIST:
      return {
        ...state,
        imagesList: [...action.imagesList],
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    // case ADD_DISPLAYED_FAV:
    //   return {
    //     ...state,
    //     displayedFavourites: [...state.displayedFavourites, action.id],
    //   }
    // case REMOVE_DISPLAYED_FAV:
    //   return {
    //     ...state,
    //     displayedFavourites: [
    //       state.displayedFavourites.filter(
    //         (item: string) => item !== action.id
    //       ),
    //     ],
    //   }
    default:
      return state
  }
}

export const actions = {
  setImagesList: (imagesList: IBreed[]) =>
    ({ type: SET_IMAGES_LIST, imagesList } as const),
  setCurrentPage: (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, currentPage } as const),
  setFilter: (filter: GalleryFilterFormType) =>
    ({ type: SET_FILTER, filter } as const),
  setTotalImagesCount: (totalImagesCount: number) =>
    ({ type: SET_TOTAL_IMAGES_COUNT, totalImagesCount } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_FETCHING, isFetching } as const),
  addDisplayedFav: (id: string | number) =>
    ({ type: ADD_DISPLAYED_FAV, id } as const),
  removeDisplayedFav: (id: string | number) =>
    ({ type: REMOVE_DISPLAYED_FAV, id } as const),
}

export const getImagesListThunk =
  (filter: GalleryFilterFormType, currentPage: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))

    const response = await imagesAPI.getImages(filter, currentPage)
    const headers = response.headers

    const imagesCount = Number(headers["content-length"])
    const imagesList = response.data
    dispatch(actions.setFilter(filter))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setTotalImagesCount(imagesCount))
    dispatch(actions.setImagesList(imagesList))

    dispatch(actions.toggleIsFetching(false))
  }

export default imagesReducer
