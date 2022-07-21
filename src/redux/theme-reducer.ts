import { BaseThunkType, InferActionsTypes } from "./redux-store"

const TOGGLE_IS_BLACK = 'pets-paw/theme/TOGGLE-IS-BLACK'

const initialState = {
   isBlack: false
}

export type InitialStateType = typeof initialState

export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>

const themeReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case TOGGLE_IS_BLACK:
         return {
            ...state,
            isBlack: !state.isBlack
         }
      default:
         return state
   }
}

export const actions = {
   toggleIsBlack: () => ({ type: TOGGLE_IS_BLACK } as const),
}

export default themeReducer