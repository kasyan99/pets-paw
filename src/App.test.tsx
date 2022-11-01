import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './redux/redux-store'

describe('App', () => {
   it('menuPage should be in the document', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>)

      const menuPage = screen.getByTestId('menu-page')

      expect(menuPage).toBeInTheDocument()
   })

   it('voting btn should be in the document', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </Provider>)

      const votingBtn = screen.getByTestId('VOTING-btn')

      expect(votingBtn).toBeInTheDocument()

      userEvent.click(votingBtn)

   })
})
