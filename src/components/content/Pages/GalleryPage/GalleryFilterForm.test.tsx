import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from '../../../../redux/redux-store'
import GalleryFilterForm from './GalleryFilterForm'

describe('GalleryFilterForm', () => {
   it('orderInput initial value should be ASC, after change = RANDOM', () => {
      render(<Provider store={store}>
         <GalleryFilterForm />
      </Provider>)

      const orderInput = screen.getByTestId('order-input')

      expect(orderInput).toBeInTheDocument()

      expect(orderInput).toHaveValue('ASC')

      fireEvent.change(orderInput, { target: { value: 'RANDOM' } })

      expect(orderInput).toHaveValue('RANDOM')

   })
})
