import { Field, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SearchForm.module.scss'

export type SearchFormType = {
   filterByBreed: string
   limitItems: number
}

const SearchForm: React.FC = () => {
   const navigate = useNavigate()

   const onSubmit = () => {

   }

   const onClick = (e: any) => {

      const path = e.target.value
      navigate(`../${path}`, { replace: true })
   }

   const onFocus = () => {
      navigate(`../search`, { replace: true })
   }
   const buttons = ['likes', 'favourities', 'dislikes']
   return <div className={classes.searchForm}>
      <Formik
         enableReinitialize
         initialValues={{ searchByName: '', }}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <div className={classes.inputWrap}>
               <Field name="searchByName" placeholder='Search for breeds by name' maxlength='30'
                  onFocus={() => onFocus()} />
            </div>
            {buttons.map(name => <button type='button' value={name} onClick={(e) => onClick(e)}>{name}</button>)}
         </form>
      )}
      </Formik>

   </div>

}

export default SearchForm