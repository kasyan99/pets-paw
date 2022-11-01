import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../../redux/redux-store'
import HomePage from './HomePage'

describe('HomePage', () => {
   it('img should be in the document', () => {
      render(<Provider store={store}>
         <HomePage />
      </Provider>)

      const img = screen.getByRole('img')

      expect(img).toBeInTheDocument()
   })
})
