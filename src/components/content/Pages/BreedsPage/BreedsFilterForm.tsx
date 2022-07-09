import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getBreedsListNamesThunk, getBreedsListThunk } from '../../../../redux/breeds-reducer';
import { getBreedsNamesList, getCurrentPage, getOrder } from '../../../../redux/breeds-selectors';
import classes from './BreedsPage.module.scss'

export type BreedsFilterFormType = {
   filterByBreed: string
   limitItems: number | null
}

const BreedsFilterForm: React.FC = () => {

   useEffect(() => {
      dispatch(getBreedsListNamesThunk())
   }, [])

   const submitBtn = document.getElementById('breedsFilterFormSubmitBtn')

   const dispatch = useDispatch()
   const order = useSelector(getOrder)

   const onSubmit = (values: BreedsFilterFormType) => {
      //when a filter is chosen, we show a new list of photos from the first page
      dispatch(getBreedsListThunk(values, 0, order))
   }

   //click submit btn to submit form
   const clickOnSubmit = () => {
      if (submitBtn !== null)
         submitBtn.click()
   }

   const changeOrder = (order: 'ASC' | 'DESC') => {
      dispatch(actions.setOrder(order))
      clickOnSubmit()
   }

   const breedsNamesList: any = useSelector(getBreedsNamesList)
   return <div className={classes.breedsFilterForm}>
      <Formik
         initialValues={{ filterByBreed: '', limitItems: 5 }}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_back}`}></button>
            <div className={`${classes.element} ${classes.pageName}`}>
               <span>BREEDS</span>
            </div>
            <div className={`${classes.element} ${classes.breedsFilterWrap}`}>
               <Field as="select" name="filterByBreed" className={`${classes.element} ${classes.breedsFilter}`}
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  <option value="">All Breeds</option>
                  {
                     Object.keys(breedsNamesList).map((key) => {
                        return <option value={key} key={key}>{breedsNamesList[key]}</option>
                     })
                  }
               </Field>
            </div>
            <div className={`${classes.element} ${classes.limitFilterWrap}`}>
               <Field as="select" name="limitItems" className={`${classes.element} ${classes.limitFilter}`}
                  //if filter was changed -> change values and submit form to get new list of photos
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  <option value={5}>Limit: 5</option>
                  <option value={10}>Limit: 10</option>
                  <option value={15}>Limit: 15</option>
                  <option value={20}>Limit: 20</option>
               </Field>
            </div>
            <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_ZtoA}`}
               onClick={() => changeOrder('DESC')}>Sorting from Z to A</button>
            <button type='button' className={`${classes.element} ${classes.btn} ${classes.btn_AtoZ}`}
               onClick={() => changeOrder('ASC')}>Sorting from A to Z</button>
            <button id='breedsFilterFormSubmitBtn' type='submit'>s</button>
         </form>
      )}

      </Formik>
   </div>

}

export default BreedsFilterForm