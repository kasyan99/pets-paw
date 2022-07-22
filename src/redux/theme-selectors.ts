import { AppStateType } from "./redux-store"

export const getIsBlack = (state: AppStateType) => {
   return state.theme.isBlack
}

export const getIsMenu = (state: AppStateType) => {
   return state.theme.isMenu
}

