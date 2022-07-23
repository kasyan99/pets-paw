import breedsReducer, { actions, InitialStateType } from "./breeds-reducer";


let state: InitialStateType = {
   breedsList: [],
   breedsCount: 0,
   filter: {
      limitItems: 5,
      filterByBreed: ''
   },
   currentPage: 0,
   order: 'ASC',
   breedsNamesList: {},
   isFetching: false,
   breedInfoPhotos: [],
   infoPhotoNumber: 0,
   numbersById: {}
}

it('currentPage should be 5', () => {
   const action = actions.setCurrentPage(5)

   const newState = breedsReducer(state, action)

   expect(newState.currentPage).toBe(5)
})
