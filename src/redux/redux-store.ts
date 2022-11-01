import {
  combineReducers,
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  Action,
} from "redux"
import breedsReducer, { ActionsBreedsType } from "./breeds-reducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import imagesReducer, { ActionsImagesType } from "./images-reducer"
import votingReducer, { ActionsVotingType } from "./voting-reducer"
import favouritesReducer, { ActionsFavouritesType } from "./favourites-reducer"
import likesReducer, { ActionsLikesType } from "./likes-reducer"
import searchReducer, { ActionsSearchType } from "./search-reducer"
import uploadingReducer, { ActionsUploadingType } from "./uploading-reducer"
import locationReducer, { ActionsLocationType } from "./location-reducer"
import themeReducer, { ActionsThemeType } from "./theme-reducer"

const redusers = combineReducers({
  breeds: breedsReducer,
  images: imagesReducer,
  voting: votingReducer,
  favourites: favouritesReducer,
  likes: likesReducer,
  search: searchReducer,
  uploading: uploadingReducer,
  location: locationReducer,
  theme: themeReducer,
})

type RootReducerType = typeof redusers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type Actions =
  | ActionsLocationType
  | ActionsSearchType
  | ActionsThemeType
  | ActionsUploadingType
  | ActionsLocationType
  | ActionsBreedsType
  | ActionsFavouritesType
  | ActionsImagesType
  | ActionsVotingType
  | ActionsLikesType

export type InferActionsTypes<
  T extends { [key: string]: (...args: any[]) => Actions }
> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<
  A extends Action,
  R = Promise<void> | void
> = ThunkAction<R, AppStateType, unknown, A>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  redusers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
)
export type AppDispatch = typeof store.dispatch
export default store
