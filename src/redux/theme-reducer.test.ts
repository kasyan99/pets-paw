import themeReducer, { actions } from "./theme-reducer";


const state = { isMenu: false, isBlack: false }

it('isMenu should be toggled', () => {
   const action = actions.toggleIsMenu(true)

   const newState = themeReducer(state, action)

   expect(newState.isMenu).toBe(true)
})

it('isBack should be toggled', () => {
   const action = actions.toggleIsBlack()

   const newState = themeReducer(state, action)

   expect(newState.isBlack).toBe(true)
})