import { AnyAction, Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { imagesAPI } from "../api/images-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_CURRENT_PAGE = 'pets-paw/images/SET-CURRENT-PAGE'
const SET_FILTER = 'pets-paw/images/SET-FILTER'
const SET_TOTAL_IMAGES_COUNT = 'pets-paw/images/SET-TOTAL-IMAGES-COUNT'
const SET_IMAGES_LIST = 'pets-paw/images/SET-IMAGES-LIST'

export type OrderType = 'ASC' | 'DESC' | 'RANDOM'
export type ImgTypeType = 'all' | 'static' | 'animated'

export type GalleryFilterFormType = {
   order: OrderType
   filterByBreed: string
   limitItems: number
   type: ImgTypeType
}

const initialState = {
   filter: {
      order: 'ASC',
      filterByBreed: '',
      limitItems: 5,
      type: 'all'
   } as GalleryFilterFormType,
   currentPage: 0,
   totalImagesCount: 0,
   imagesList: [] as Array<Object>
}

export type InitialStateType = typeof initialState

export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>

const imagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage
         }
      case SET_FILTER:
         return {
            ...state,
            filter: { ...state.filter }
         }
      case SET_TOTAL_IMAGES_COUNT:
         return {
            ...state,
            totalImagesCount: action.totalImagesCount
         }
      case SET_IMAGES_LIST:
         return {
            ...state,
            imagesList: [...action.imagesList]
         }
      default:
         return state
   }
}

export const actions = {
   setImagesList: (imagesList: Array<Object>) => ({ type: SET_IMAGES_LIST, imagesList } as const),
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setFilter: (filter: GalleryFilterFormType) => ({ type: SET_FILTER, filter } as const),
   setTotalImagesCount: (totalImagesCount: number) => ({ type: SET_TOTAL_IMAGES_COUNT, totalImagesCount } as const)
}

// export const getImagesListThunk = (filter: GalleryFilterFormType, currentPage: number): ThunkType => async (dispatch) => {
//    const response = await imagesAPI.getImages(filter, currentPage)

//    console.log(response)
//    return response.data
// }
export const getImagesListThunk = (filter: GalleryFilterFormType, currentPage: number): ThunkType => async (dispatch) => {
   const response = await imagesAPI.getImages(null, null)
   const headers = response.headers
   const imagesCount = Number(headers['pagination-count'])

   const imagesList = response.data

   console.log('imagesCount', imagesCount);
   console.log('imagesList', imagesList);


   dispatch(actions.setTotalImagesCount(imagesCount))
   dispatch(actions.setImagesList(imagesList))
}

export default imagesReducer