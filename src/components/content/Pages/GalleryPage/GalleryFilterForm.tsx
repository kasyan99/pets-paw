import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedsListNamesThunk } from '../../../../redux/breeds-reducer';
import { getBreedsNamesList, getFilter, getOrder } from '../../../../redux/breeds-selectors';
import { GalleryFilterFormType, getImagesListThunk } from '../../../../redux/images-reducer';
import classes from './GalleryFilterForm.module.scss'

const GalleryFilterForm: React.FC = () => {

   useEffect(() => {
      dispatch(getBreedsListNamesThunk())
   }, [])

   const submitBtn = document.getElementById('breedsFilterFormSubmitBtn')

   const dispatch = useDispatch()
   const order = useSelector(getOrder)
   // const filter = useSelector(getFilter)

   const onSubmit = (filter: GalleryFilterFormType) => {
      //when a filter is chosen, we show a new list of photos from the first page
      dispatch(getImagesListThunk(filter, 0))
   }

   //click submit btn to submit form
   const clickOnSubmit = () => {
      if (submitBtn !== null)
         submitBtn.click()
   }

   const limits: Array<Number> = []

   for (let i = 5; i <= 20; i += 5) {
      limits.push(i)
   }

   const breedsNamesList: any = useSelector(getBreedsNamesList)
   return <div className={classes.galleryFilterForm}>
      <Formik
         enableReinitialize
         initialValues={{ order: 'ASC', type: 'static', filterByBreed: '', limitItems: 5 } as GalleryFilterFormType}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <div className={classes.fieldWrapper}>
               <label>ORDER</label>
               <Field as="select" name="order" className={`${classes.selectField} ${classes.element}`}
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  <option value="RANDOM">Random</option>
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
               </Field>
            </div>
            <div className={classes.fieldWrapper}>
               <label>TYPE</label>
               <Field as="select" name="type" className={`${classes.selectField} ${classes.element}`}
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  <option value="all">All</option>
                  <option value="static">Static</option>
                  <option value="animated">Animated</option>
               </Field>
            </div>
            <div className={classes.fieldWrapper}>
               <label>BREED</label>
               <Field as="select" name="filterByBreed" className={`${classes.selectField} ${classes.element}`}
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  <option value="">None</option>
                  {
                     Object.keys(breedsNamesList).map((key) => {
                        return <option value={key} key={key}>{breedsNamesList[key]}</option>
                     })
                  }
               </Field>
            </div>
            <div className={classes.fieldWrapper}>
               <label>LIMIT</label>
               <Field component="select" name="limitItems" className={`${classes.selectField} ${classes.element}`}
                  //if filter was changed -> change values and submit form to get new list of photos
                  onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
                  {limits.map(limit => <option value={`${limit}`} key={`${limit}`}>{`${limit} items per page`}</option>)}
               </Field>
            </div>
            <button id='breedsFilterFormSubmitBtn' type='submit'>s</button>
         </form>
      )}
      </Formik>
   </div>

}

export default GalleryFilterForm