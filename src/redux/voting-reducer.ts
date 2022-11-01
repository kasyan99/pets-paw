import { imagesAPI } from "../api/images-api"
import { votingAPI } from "../api/voting-api"
import { FavByImageId, IVoutedItem } from "../models/models"
import { GalleryFilterFormType } from "./images-reducer"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREED_IMAGE = "pets-paw/voting/SET-BREED-IMAGE"
const TOGGLE_FETCHING = "pets-paw/voting/TOGGLE-FETCHING"
const ADD_USER_ACTION = "pets-paw/voting/SET-USER-ACTION"
const REMOVE_USER_ACTION = "pets-paw/voting/REMOVE-USER-ACTION"
const ADD_FAVOURITES = "pets-paw/voting/ADD-FAVOURITES"
const REMOVE_FAVOURITES = "pets-paw/voting/REMOVE-FAVOURITES"
const SET_FAVOURITES = "pets-paw/voting/SET-FAVOURITES"
const ADD_FAV_BY_IMAGE_ID = "pets-paw/voting/ADD-FAV-BY-IMAGE-ID"

export type BreedImageType = {
  url: string
  id: string
}

export type UsersActionType = {
  id: string
  type: "Favourites" | "Likes" | "Dislikes"
  action: "added to" | "removed from"
  time: string
}

const initialState = {
  breedImage: {} as BreedImageType,
  isFetching: false,
  userActions: [] as UsersActionType[],
  favourites: [] as string[],
  favByImageId: {} as FavByImageId,
}

export type InitialStateType = typeof initialState

export type ActionsVotingType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsVotingType>

const votingReducer = (
  state = initialState,
  action: ActionsVotingType
): InitialStateType => {
  switch (action.type) {
    case SET_BREED_IMAGE:
      return {
        ...state,
        breedImage: action.breedImage,
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case ADD_USER_ACTION:
      return {
        ...state,
        userActions: [action.userAction, ...state.userActions],
      }
    case REMOVE_USER_ACTION:
      const copy = state.userActions
      copy.pop()
      return {
        ...state,
        userActions: [...copy],
      }
    case SET_FAVOURITES:
      return {
        ...state,
        favourites: action.favourites,
      }
    case ADD_FAVOURITES:
      return {
        ...state,
        favourites: [...state.favourites, action.id],
      }
    case ADD_FAV_BY_IMAGE_ID:
      const obj = Object.assign(state.favByImageId, ...action.fav)
      return {
        ...state,
        favByImageId: { ...obj },
      }
    case REMOVE_FAVOURITES:
      return {
        ...state,
        favourites: [
          ...state.favourites.filter((item: string) => item !== action.id),
        ],
      }

    default:
      return state
  }
}

export const actions = {
  setBreedImage: (breedImage: BreedImageType) =>
    ({ type: SET_BREED_IMAGE, breedImage } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_FETCHING, isFetching } as const),
  addUserAction: (userAction: UsersActionType) =>
    ({ type: ADD_USER_ACTION, userAction } as const),
  removeUserAction: () => ({ type: REMOVE_USER_ACTION } as const),
  setFavourites: (favourites: string[]) =>
    ({ type: SET_FAVOURITES, favourites } as const),
  addFavourites: (id: string) => ({ type: ADD_FAVOURITES, id } as const),
  addFavByImageId: (fav: FavByImageId[]) =>
    ({ type: ADD_FAV_BY_IMAGE_ID, fav } as const),
  removeFavourites: (id: string) => ({ type: REMOVE_FAVOURITES, id } as const),
}

export const getRandomBreed = (): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true))
  const filter: GalleryFilterFormType = {
    filterByBreed: "",
    limitItems: 1,
    order: "RANDOM",
    type: "all",
  }
  const { url, id } = (await imagesAPI.getImages(filter, 0)).data[0]

  const breedImage: BreedImageType = { url, id }

  dispatch(actions.setBreedImage(breedImage))
  dispatch(actions.toggleIsFetching(false))
}

export const setVote =
  (id: string, value: 0 | 1): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    await votingAPI.setVote(id, value)
    dispatch(actions.toggleIsFetching(false))
  }

export const addToFavourite =
  (breed_id: string): ThunkType =>
  async (dispatch) => {
    await votingAPI.addToFavourite(breed_id)
    dispatch(actions.addFavourites(breed_id))
    dispatch(getFavourites(null))
  }

export const deleteFavourite =
  (fav_id: string, breed_id: string): ThunkType =>
  async (dispatch) => {
    await votingAPI.deleteFavourites(fav_id)
    dispatch(actions.removeFavourites(breed_id))
  }

export const getFavourites =
  (limit: number | null): ThunkType =>
  async (dispatch) => {
    const data: IVoutedItem[] = (await votingAPI.getFavourites(limit)).data

    const imageIdList = data.map((item) => item.image_id)

    dispatch(actions.setFavourites(imageIdList))

    const favByImageId = data.map((item) => ({
      [item.image_id]: String(item.id),
    }))
    dispatch(actions.addFavByImageId(favByImageId))
  }

export default votingReducer
