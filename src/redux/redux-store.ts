import { combineReducers, legacy_createStore as createStore, compose, applyMiddleware, Action, AnyAction } from "redux"
import breedsReducer from "./breeds-reducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

const redusers = combineReducers({
   breeds: breedsReducer
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