import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../../redux/redux-store'
import MenuPage from './MenuPage'

describe('MenuPage', () => {
   it('theme should change after click theme-change-btn', () => {

      render(<Provider store={store}>
         <BrowserRouter>
            <MenuPage />
         </BrowserRouter>
      </Provider>)

      const btn = screen.getByTestId('change-theme')
      expect(btn).toBeInTheDocument()

      let blackMenu = screen.queryByTestId('menu-page-black')
      expect(blackMenu).not.toBeInTheDocument()

      userEvent.click(btn)

      blackMenu = screen.queryByTestId('menu-page-black')
      expect(blackMenu).toBeInTheDocument()
   })

   it('renders a text', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <MenuPage />
         </BrowserRouter>
      </Provider>)

      const text = screen.getByText("Welcome to cat's gallery")

      expect(text).toBeInTheDocument()
   })

   it('renders a button', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <MenuPage />
         </BrowserRouter>
      </Provider>)

      const button = screen.getByTestId('btn-open-modal')

      expect(button).toBeInTheDocument()

   })

   it('renders a menu', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <MenuPage />
         </BrowserRouter>
      </Provider>)

      const menu = screen.getByTestId('menu')

      expect(menu).toBeInTheDocument()

   })

   it('renders a home-page link', () => {
      render(<Provider store={store}>
         <BrowserRouter>
            <MenuPage />
         </BrowserRouter>
      </Provider>)

      const link = screen.getByTestId('home-page')

      expect(link).toBeInTheDocument()

      const breedsLink = screen.getByText(/breeds/i)

      expect(breedsLink).toBeInTheDocument()

      const breedsList = screen.queryByTestId('breeds-list')
      expect(breedsList).not.toBeInTheDocument()

   })


})