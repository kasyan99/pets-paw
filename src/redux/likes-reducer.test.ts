import likesReducer, { actions } from "./likes-reducer"
import { UsersActionType } from "./voting-reducer"

const state = {
  currentPage: 0,
  limit: 5,
  isFetching: false,
  likesList: [
    {
      id: "1",
      url: "url1",
      width: 100,
      height: 100,
    },
    {
      id: "2",
      url: "url2",
      width: 100,
      height: 100,
    },
    {
      id: "3",
      url: "url3",
      width: 100,
      height: 100,
    },
  ],
  totalImagesCount: 0,
  userActions: [
    {
      id: "sdfsdf",
      type: "Favourites",
      action: "added to",
      time: "20:22",
    },
  ] as UsersActionType[],
}

it("likesList length should be 0", () => {
  const action = actions.clearLikesList()

  const newState = likesReducer(state, action)

  expect(newState.likesList.length).toBe(0)
})
