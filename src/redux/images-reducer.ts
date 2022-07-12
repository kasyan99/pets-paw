import { imagesAPI } from "../api/images-api"
import { BaseThunkType, InferActionsTypes } from "./redux-store"

const SET_CURRENT_PAGE = 'pets-paw/images/SET-CURRENT-PAGE'
const SET_FILTER = 'pets-paw/images/SET-FILTER'

export type OrderType = 'ASC' | 'DESC' | 'RANDOM'
export type ImgTypeType = 'all' | 'static' | 'animated'

export type GalleryFilterFormType = {
   order: OrderType
   filterByBreed: string
   limitItems: number
   type: ImgTypeType
}

const initialState = {
   filter: {
      order: 'ASC',
      filterByBreed: '',
      limitItems: 5,
      type: 'all'
   } as GalleryFilterFormType,
   currentPage: 0
}

export type InitialStateType = typeof initialState

type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const imagesReducer = (state = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.currentPage
         }
      case SET_FILTER:
         return {
            ...state,
            filter: { ...state.filter }
         }
      default:
         return state
   }
}

export const actions = {
   setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),
   setFilter: (filter: GalleryFilterFormType) => ({ type: SET_FILTER, filter } as const),
}

export const getImagesListThunk = (filter: GalleryFilterFormType, currentPage: number): any => async (dispatch: any) => {
   const response = await imagesAPI.getImages(filter, currentPage)

   console.log(response)

}

// export const getBreedsListThunk = (values: BreedsFilterFormType, page: number | null, order = 'ASC' as 'ASC' | 'DESC'): any => async (dispatch: any) => {

//    dispatch(actions.toggleIsFetching(true))

//    const { filterByBreed, limitItems } = values
//    let response
//    if (filterByBreed !== '') {
//       response = await breedsAPI.getByBreed(filterByBreed)
//    } else {

//       response = await breedsAPI.getBreads(limitItems, page, order)

//       await dispatch(actions.setOrder(order))
//       // const breeds = await breedsAPI.getBreads(null, null)
//       if (limitItems) {
//          await dispatch(actions.setLimitItems(limitItems))
//       }
//       // await dispatch(actions.setUsersCount(breeds.length))
//       if (page || page === 0) {
//          await dispatch(actions.setCurrentPage(page))
//       }
//    }
//    await dispatch(actions.setByBreed(filterByBreed))
//    dispatch(actions.setBreedsList(response))

//    dispatch(actions.toggleIsFetching(false))

// }

// export const getBreedsListNamesThunk = (): any => async (dispatch: Dispatch<ActionsType>) => {
//    const breeds = await breedsAPI.getBreads(null, null)

//    let breedsNamesList: any = {}
//    breeds.map(((breed: any) => {
//       breedsNamesList[breed.id] = breed.name
//    }))

//    dispatch(actions.setBreedsNamesList(breedsNamesList))
// }

// export const getTotalUsersCount = (): any => async (dispatch: any) => {
//    const headers = await breedsAPI.getTotalUsersCount()
//    const usersCount = Number(headers['pagination-count'])
//    dispatch(actions.setUsersCount(usersCount))
// }

export default imagesReducer