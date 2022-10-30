import { imagesAPI } from "../api/images-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const TOGGLE_IS_UPLOADING = "pets-paw/uploading/TOGGLE-IS-UPLOADING"
const TOGGLE_IS_FETCHING = "pets-paw/uploading/TOGGLE-IS-FETCHING"
const SET_CURRENT_FILE = "pets-paw/uploading/SET-CURRENT-FILE"
const SET_FILE_NAME = "pets-paw/uploading/SET-FILE-NAME"
const SET_FILE_PATH = "pets-paw/uploading/SET-FILE-PATH"
const TOGGLE_IS_CAT = "pets-paw/uploading/TOGGLE-IS-CAT"

const initialState = {
  isUploading: false,
  isFetching: false,
  currentFile: null as File | null,
  fileName: "",
  filePath: "",
  isCat: null as boolean | null,
}

export type InitialStateType = typeof initialState

export type ActionsType = InferActionsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsType>

const uploadingReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case TOGGLE_IS_UPLOADING:
      return {
        ...state,
        isUploading: action.isUploading,
      }
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.currentFile,
      }
    case SET_FILE_NAME:
      return {
        ...state,
        fileName: action.fileName,
      }
    case SET_FILE_PATH:
      return {
        ...state,
        filePath: action.filePath,
      }
    case TOGGLE_IS_CAT:
      return {
        ...state,
        isCat: action.isCat,
      }
    default:
      return state
  }
}

export const actions = {
  toggleIsUploading: (isUploading: boolean) =>
    ({ type: TOGGLE_IS_UPLOADING, isUploading } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_IS_FETCHING, isFetching } as const),
  setCurrentFile: (currentFile: File | null) =>
    ({ type: SET_CURRENT_FILE, currentFile } as const),
  setFileName: (fileName: string) =>
    ({ type: SET_FILE_NAME, fileName } as const),
  setFilePath: (filePath: string) =>
    ({ type: SET_FILE_PATH, filePath } as const),
  toggleIsCat: (isCat: boolean | null) =>
    ({ type: TOGGLE_IS_CAT, isCat } as const),
}

export const uploadImage =
  (file: File): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    try {
      await imagesAPI.uploadImage(file)
      dispatch(actions.toggleIsCat(true))
      dispatch(actions.setCurrentFile(null))
      dispatch(actions.setFileName(""))
      dispatch(actions.setFilePath(""))
    } catch {
      dispatch(actions.toggleIsCat(false))
    }

    dispatch(actions.toggleIsFetching(false))
  }

export const setCurrentFile =
  (target: EventTarget & HTMLInputElement): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsCat(null))

    if (target && target.files) {
      const file: File = target.files[0]
      const reader = new FileReader()
      reader.onload = (file) => {
        if (file.target) {
          dispatch(actions.setFilePath(String(file.target.result)))
        }
      }
      reader.readAsDataURL(file)

      dispatch(actions.setCurrentFile(file))
      dispatch(actions.setFileName(file.name))
    }
  }

export default uploadingReducer
