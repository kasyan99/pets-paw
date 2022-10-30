import likesReducer, { actions } from "./likes-reducer"

const state = {
  currentPage: 0,
  limit: 5,
  isFetching: false,
  likesList: [
    { id: 0, name: "cat" },
    { id: 1, name: "cat1" },
    { id: 2, name: "cat2" },
  ],
  totalImagesCount: 0,
  userActions: [
    // {
    //    id: 'sdfsdf',
    //    type: 'Favourites',
    //    action: 'added to',
    //    time: '20:22'
    // }
  ],
}

it("likesList length should be 0", () => {
  const action = actions.clearLikesList()

  // const newState = likesReducer(state, action)

  // expect(newState.likesList.length).toBe(0)
})
