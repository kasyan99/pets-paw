import { Field, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { getBreadsByName } from '../../redux/search-reducer';
import { actions } from '../../redux/theme-reducer';
import { getIsBlack } from '../../redux/theme-selectors';
import classes from './SearchForm.module.scss'

const SearchForm: React.FC = () => {
   const navigate = useNavigate()
   const location = useLocation()
   const pageName = location.pathname.slice(1)

   const dispatch = useAppDispatch()

   const onSubmit = (values: { breedName: string }) => {
      navigate(`../search`, { replace: true })

      dispatch(getBreadsByName(values.breedName))
   }
   const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const path = (e.target as HTMLInputElement).value
      navigate(`../${path}`, { replace: true })
   }

   const isBlack = useSelector(getIsBlack)

   const buttons = ['likes', 'favourities', 'dislikes']

   const openMenu = () => {
      dispatch(actions.toggleIsMenu(true))
   }

   return <div className={`${classes.searchForm} ${isBlack && classes.black}`}>
      <Formik
         enableReinitialize
         initialValues={{ breedName: '', }}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <div className={classes.menuBtn} onClick={openMenu}>Menu</div>
            <div className={classes.inputWrap}>
               <Field name="breedName" placeholder='Search for breeds by name' maxLength='30' autoComplete="off" />
               <button type='submit' className={classes.searchBtn}>search</button>
            </div>
            {buttons.map(name => <button type='button' value={name} onClick={(e) => onClick(e)} key={name}
               className={pageName === name ? classes[`${pageName}_active`] : ''}>{name}</button>)}
         </form>
      )}
      </Formik>
   </div>

}

export default SearchForm