import { combineReducers, legacy_createStore as createStore, compose, applyMiddleware, Action } from "redux"
import breedsReducer from "./breeds-reducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import imagesReducer from "./images-reducer";
import votingReducer from "./voting-reducer";
import favouritesReducer from "./favourites-reducer";
import likesReducer from "./likes-reducer";


const redusers = combineReducers({
   breeds: breedsReducer,
   images: imagesReducer,
   voting: votingReducer,
   favourites: favouritesReducer,
   likes: likesReducer
})

type RootReducerType = typeof redusers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action, R = Promise<void> | void> = ThunkAction<R, AppStateType, unknown, A>

declare global {
   interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
   }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;