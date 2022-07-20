import { AppStateType } from "./redux-store"

export const getIsUploading = (state: AppStateType) => {
   return state.uploading.isUploading
}

export const getIsFetching = (state: AppStateType) => {
   return state.uploading.isFetching
}

export const getCurrentFile = (state: AppStateType) => {
   return state.uploading.currentFile
}

export const getFileName = (state: AppStateType) => {
   return state.uploading.fileName
}

export const getFilePath = (state: AppStateType) => {
   return state.uploading.filePath
}

export const getIsCat = (state: AppStateType) => {
   return state.uploading.isCat
}
