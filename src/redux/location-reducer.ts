import { InferActionsTypes } from "./redux-store"

const ADD_LOCATION = "pets-paw/location/ADD-LOCATION"
const REMOVE_LOCATION = "pets-paw/location/REMOVE-LOCATION"
const SET_CURRENT_LOCATION = "pets-paw/location/SET-CURRENT-LOCATION"
const SET_IS_BACK = "pets-paw/location/SET-IS-BACK"

const initialState = {
  currentLocation: 0,
  locationList: [] as string[],
  isBack: false,
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>

const locationReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      }
    case ADD_LOCATION:
      return {
        ...state,
        locationList: [...state.locationList, action.location],
      }
    case REMOVE_LOCATION:
      const newList = [...state.locationList]
      newList.pop()
      return {
        ...state,
        locationList: [...newList],
      }
    case SET_IS_BACK:
      return {
        ...state,
        isBack: action.isBack,
      }
    default:
      return state
  }
}

export const actions = {
  setCurrentlocation: (currentLocation: number) =>
    ({ type: SET_CURRENT_LOCATION, currentLocation } as const),
  addLocation: (location: string) =>
    ({ type: ADD_LOCATION, location } as const),
  removeLocation: () => ({ type: REMOVE_LOCATION } as const),
  setIsBack: (isBack: boolean) => ({ type: SET_IS_BACK, isBack } as const),
}

export default locationReducer
