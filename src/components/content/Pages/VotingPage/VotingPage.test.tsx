import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../../../redux/redux-store'
import VotingPage from './VotingPage'

describe('VotingPage', () => {
   it('renders a likeBtn', async () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <VotingPage />
         </BrowserRouter>
      </Provider>)

      const likeBtn = screen.getByTestId("add-to-like-btn")

      expect(likeBtn).toBeInTheDocument()

      const actionLog = screen.queryByTestId("user-action-log")

      expect(actionLog).not.toBeInTheDocument()

   })
})