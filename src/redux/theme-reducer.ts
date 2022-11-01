import { BaseThunkType, InferActionsTypes } from "./redux-store"

const TOGGLE_IS_BLACK = "pets-paw/theme/TOGGLE-IS-BLACK"
const TOGGLE_IS_MENU = "pets-paw/theme/TOGGLE-IS-MENU"

const initialState = {
  isBlack: false,
  isMenu: false,
}

export type InitialStateType = typeof initialState

export type ActionsThemeType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsThemeType>

const themeReducer = (
  state = initialState,
  action: ActionsThemeType
): InitialStateType => {
  switch (action.type) {
    case TOGGLE_IS_BLACK:
      return {
        ...state,
        isBlack: !state.isBlack,
      }
    case TOGGLE_IS_MENU:
      return {
        ...state,
        isMenu: action.isMenu,
      }
    default:
      return state
  }
}

export const actions = {
  toggleIsBlack: () => ({ type: TOGGLE_IS_BLACK } as const),
  toggleIsMenu: (isMenu: boolean) =>
    ({ type: TOGGLE_IS_MENU, isMenu } as const),
}

export default themeReducer
