import { imagesAPI } from "../api/images-api"
import { votingAPI } from "../api/voting-api"
import { GalleryFilterFormType } from "./images-reducer"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_BREED_IMAGE = 'pets-paw/voting/SET-BREED-IMAGE'
const TOGGLE_FETCHING = 'pets-paw/voting/TOGGLE-FETCHING'
const SET_USER_ACTION = 'pets-paw/voting/SET-USER-ACTION'
const REMOVE_USER_ACTION = 'pets-paw/voting/REMOVE-USER-ACTION'

export type BreedImageType = {
   url: string
   id: string
}

export type UsersActionType = {
   id: string
   type: 'Favourites' | 'Likes' | 'Dislikes'
   action: 'addes' | 'removed'
   time: string
}

const initialState = {
   breedImage: {} as BreedImageType,
   isFetching: false,
   userActions: [
      {
         id: 'sdfsdf',
         type: 'Favourites',
         action: 'addes',
         time: '20:22'
      }
   ] as Array<UsersActionType>
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const votingReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_BREED_IMAGE:
         return {
            ...state,
            breedImage: action.breedImage
         }
      case TOGGLE_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching
         }
      case SET_USER_ACTION:
         return {
            ...state,
            userActions: [action.userAction, ...state.userActions]
         }
      case REMOVE_USER_ACTION:
         const copy = state.userActions
         copy.pop()
         return {
            ...state,
            userActions: [...copy]
         }
      default:
         return state
   }
}

export const actions = {
   setBreedImage: (breedImage: any) => ({ type: SET_BREED_IMAGE, breedImage } as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
   addUserAction: (userAction: UsersActionType) => ({ type: SET_USER_ACTION, userAction } as const),
   removeUserAction: () => ({ type: REMOVE_USER_ACTION } as const)
}

export const getRandomBreed = (): ThunkType => async (dispatch) => {

   dispatch(actions.toggleIsFetching(true))
   const filter: GalleryFilterFormType = {
      filterByBreed: '',
      limitItems: 1,
      order: 'RANDOM',
      type: "all"
   }
   const { url, id } = (await imagesAPI.getImages(filter, 0)).data[0]

   const breedImage: BreedImageType = { url, id }
   console.log('breed', breedImage);


   dispatch(actions.setBreedImage(breedImage))
   dispatch(actions.toggleIsFetching(false))
}

export const setVote = (id: string, value: 0 | 1): ThunkType => async (dispatch) => {
   dispatch(actions.toggleIsFetching(true))
   await votingAPI.setVote(id, value)
   dispatch(actions.toggleIsFetching(false))
}

export const getVotes = (): ThunkType => async (dispatch) => {
   const data = await votingAPI.getVotes()
   console.log(data);

}

export default votingReducer