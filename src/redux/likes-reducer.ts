import { imagesAPI } from "../api/images-api"
import { votingAPI } from "../api/voting-api"
import { IImage, IVoutedItem } from "../models/models"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { UsersActionType } from "./voting-reducer"

const SET_CURRENT_PAGE = "pets-paw/likes/SET-CURRENT-PAGE"
const SET_LIMIT = "pets-paw/likes/SET-LIMIT"
const TOGGLE_FETCHING = "pets-paw/likes/TOGGLE-FETCHING"
const CLEAR_LIKES_LIST = "pets-paw/likes/CLEAR-LIKES-LIST"
const ADD_LIKED_IMAGE = "pets-paw/likes/ADD-LIKED-IMAGE"
const REMOVE_LIKED_IMAGE = "pets-paw/likes/REMOVE-LIKED-IMAGE"
const SET_TOTAL_COUNT = "pets-paw/likes/SET-TOTAL-COUNT"

const ADD_USER_ACTION = "pets-paw/likes/SET-USER-ACTION"
const REMOVE_USER_ACTION = "pets-paw/likes/REMOVE-USER-ACTION"

const initialState = {
  currentPage: 0,
  limit: 5,
  isFetching: false,
  likesList: [] as IImage[],
  totalImagesCount: 0,
  userActions: [
    // {
    //    id: 'sdfsdf',
    //    type: 'Favourites',
    //    action: 'added to',
    //    time: '20:22'
    // }
  ] as Array<UsersActionType>,
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const likesReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case TOGGLE_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case CLEAR_LIKES_LIST:
      return {
        ...state,
        likesList: [],
      }
    case ADD_LIKED_IMAGE:
      return {
        ...state,
        likesList: { ...state.likesList, ...action.likedImage },
      }
    case REMOVE_LIKED_IMAGE:
      const copyList = { ...state.likesList }
      delete copyList[Number(action.vote_id)]
      return {
        ...state,
        likesList: { ...copyList },
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalImagesCount: action.totalImagesCount,
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
    default:
      return state
  }
}

export const actions = {
  setCurrentPage: (currentPage: number) =>
    ({ type: SET_CURRENT_PAGE, currentPage } as const),
  setLimit: (limit: number) => ({ type: SET_LIMIT, limit } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: TOGGLE_FETCHING, isFetching } as const),
  clearLikesList: () => ({ type: CLEAR_LIKES_LIST } as const),
  removeLikedImage: (vote_id: string) =>
    ({ type: REMOVE_LIKED_IMAGE, vote_id } as const),
  addLikedImage: (likedImage: { [key: string]: IImage }) =>
    ({ type: ADD_LIKED_IMAGE, likedImage } as const),
  setTotalCount: (totalImagesCount: number) =>
    ({ type: SET_TOTAL_COUNT, totalImagesCount } as const),

  addUserAction: (userAction: UsersActionType) =>
    ({ type: ADD_USER_ACTION, userAction } as const),
  removeUserAction: () => ({ type: REMOVE_USER_ACTION } as const),
}

export const getVotesList =
  (value: 0 | 1, limit = null, page = 0): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))

    dispatch(actions.clearLikesList())

    const data: IVoutedItem[] = await votingAPI.getVotes(limit, page)
    limit && dispatch(actions.setLimit(limit))
    dispatch(actions.setCurrentPage(page))

    const voteList = data.filter((item) => item.value === value)

    type votesImagesIdType = { image_id: string; vote_id: string }
    const votesImagesIdList: votesImagesIdType[] = voteList.map((item) => ({
      image_id: item.image_id,
      vote_id: String(item.id),
    }))
    dispatch(actions.setTotalCount(votesImagesIdList.length))

    votesImagesIdList.map(async (image: votesImagesIdType) => {
      const item: IImage = await imagesAPI.getImageById(image.image_id)

      dispatch(
        actions.addLikedImage({
          [image.vote_id]: { ...item, vote_id: image.vote_id },
        })
      )
    })

    dispatch(actions.toggleIsFetching(false))
  }

export const deleteVote =
  (vote_id: string): ThunkType =>
  async (dispatch) => {
    votingAPI.deleteVote(vote_id)
    dispatch(actions.removeLikedImage(vote_id))
  }
export default likesReducer
