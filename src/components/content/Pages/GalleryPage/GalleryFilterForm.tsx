import { Field, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedsListNamesThunk } from '../../../../redux/breeds-reducer';
import { getBreedsNamesList } from '../../../../redux/breeds-selectors';
import { actions, GalleryFilterFormType, getImagesListThunk } from '../../../../redux/images-reducer';
import { getFilter } from '../../../../redux/images-selectors';
import classes from './GalleryFilterForm.module.scss'

const GalleryFilterForm: React.FC = () => {
   const dispatch = useDispatch<any>()

   useEffect(() => {
      dispatch(getBreedsListNamesThunk())
   }, [])

   const { order, type, filterByBreed, limitItems } = useSelector(getFilter)

   const onSubmit = (filter: GalleryFilterFormType) => {
      // dispatch(actions.setFilter(filter))

      dispatch(getImagesListThunk(filter, 0))
   }

   //generate limitItems options values 
   const limits: Array<Number> = []
   for (let i = 5; i <= 20; i += 5) {
      limits.push(i)
   }

   const breedsNamesList: any = useSelector(getBreedsNamesList)
   return <div className={classes.galleryFilterForm}>
      <Formik
         enableReinitialize
         initialValues={{ order: order, type: type, filterByBreed: filterByBreed, limitItems: limitItems } as GalleryFilterFormType}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <div className={classes.fieldWrapper}>
               <label>ORDER</label>
               <Field as="select" name="order" className={`${classes.selectField} ${classes.element}`}
                  onChange={props.handleChange}>
                  <option value="RANDOM">Random</option>
                  <option value="DESC">Desc</option>
                  <option value="ASC">Asc</option>
               </Field>
            </div>
            <div className={classes.fieldWrapper}>
               <label>TYPE</label>
               <Field as="select" name="type" className={`${classes.selectField} ${classes.element}`}
                  onChange={props.handleChange}>
                  <option value="all">All</option>
                  <option value="static">Static</option>
                  <option value="animated">Animated</option>
               </Field>
            </div>
            <div className={classes.fieldWrapper}>
               <label>BREED</label>
               <Field as="select" name="filterByBreed" className={`${classes.selectField} ${classes.element}`}
                  onChange={props.handleChange}>
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
                  onChange={props.handleChange}>
                  {limits.map(limit => <option value={`${limit}`} key={`${limit}`}>{`${limit} items per page`}</option>)}
               </Field>
               <button type='submit' className={`${classes.update} ${classes.element}`}>submit</button>
            </div>
         </form>
      )}
      </Formik>
   </div>

}

export default GalleryFilterForm