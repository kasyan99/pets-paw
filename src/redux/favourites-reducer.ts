import { imagesAPI } from "../api/images-api"
import { votingAPI } from "../api/voting-api"
import { GalleryFilterFormType } from "./images-reducer"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { UsersActionType } from "./voting-reducer"

const SET_CURRENT_PAGE = 'pets-paw/favourites/SET-CURRENT-PAGE'
const SET_LIMIT = 'pets-paw/favourites/SET-LIMIT'
const TOGGLE_FETCHING = 'pets-paw/favourites/TOGGLE-FETCHING'
const SET_FAVOURITES_LIST = 'pets-paw/favourites/SET-FAVOURITES-LIST'
const SET_TOTAL_COUNT = 'pets-paw/favourites/SET-TOTAL-COUNT'

const ADD_USER_ACTION = 'pets-paw/favourites/SET-USER-ACTION'
const REMOVE_USER_ACTION = 'pets-paw/favourites/REMOVE-USER-ACTION'


const initialState = {
   currentPage: 0,
   limit: 5,
   isFetching: false,
   favouritesList: [] as Array<any>,
   totalImagesCount: 0,
   userActions: [
      // {
      //    id: 'sdfsdf',
      //    type: 'Favourites',
      //    action: 'added to',
      //    time: '20:22'
      // }
   ] as Array<UsersActionType>,
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const favouritesReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage
         }
      case TOGGLE_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }
      case SET_FAVOURITES_LIST:
         return {
            ...state,
            favouritesList: [...action.favouritesList]
         }
      case SET_TOTAL_COUNT:
         return {
            ...state,
            totalImagesCount: action.totalImagesCount
         }

      case ADD_USER_ACTION:
         console.log('ADD_USER_ACTION');

         return {
            ...state,
            userActions: [action.userAction, ...state.userActions]
         }
      case REMOVE_USER_ACTION:
         const copy = state.userActions
         copy.pop()
         return {
            ...state,
            userActions: [...copy]
         }
      default:
         return state
   }
}

export const actions = {
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setLimit: (limit: number) => ({ type: SET_LIMIT, limit } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
   setFavouritesList: (favouritesList: any) => ({ type: SET_FAVOURITES_LIST, favouritesList } as const),
   setTotalCount: (totalImagesCount: number) => ({ type: SET_TOTAL_COUNT, totalImagesCount } as const),

   addUserAction: (userAction: UsersActionType) => ({ type: ADD_USER_ACTION, userAction } as const),
   removeUserAction: () => ({ type: REMOVE_USER_ACTION } as const),
}


export const getFavouritesList = (limit = 5, page = 0): ThunkType => async (dispatch) => {
   dispatch(actions.toggleIsFetching(true))
   const { data, headers } = (await votingAPI.getFavourites(limit, page))
   dispatch(actions.setLimit(limit))
   dispatch(actions.setCurrentPage(page))
   console.log(headers);
   dispatch(actions.setTotalCount(Number(headers['pagination-count'])))
   dispatch(actions.setFavouritesList(data))

   dispatch(actions.toggleIsFetching(false))
}

// export const getImagesListThunk = (limit: number, currentPage: number): ThunkType => async (dispatch) => {

//    dispatch(actions.toggleIsFetching(true))

//    const response = await votingAPI.getFavourites(limit, currentPage)
//    // const headers = response.headers

//    // const imagesCount = Number(headers['content-length'])
//    // const imagesList = response.data
//    // dispatch(actions.setFilter(filter))
//    // dispatch(actions.setCurrentPage(currentPage))
//    // dispatch(actions.setTotalImagesCount(imagesCount))
//    // dispatch(actions.setImagesList(imagesList))

//    dispatch(actions.toggleIsFetching(false))

// }

export default favouritesReducer