import { Field, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreedsListThunk } from '../../../redux/breeds-reducer';
import { getBreedsList } from '../../../redux/breeds-selectors';
import classes from './BreedsPage.module.scss'



type Props = {
   breedsList: Array<any>
}

const BreedsList: React.FC<Props> = ({ breedsList }) => {
   const breedPhotos = () => {
      if (breedsList.length > 0) {

         return breedsList.map(breed => {
            if (breed.image) {
               if (breed.image.url)
                  return <div className={classes.grid__item} key={breed.id}><img src={breed.image.url} alt={breed.alt_names === '' ? breed.name : breed.alt_names} /></div>
            }
         })
      } else {
         return <></>
      }
   }

   return <div className={classes.breedsList}>
      <div className={classes.grid__layout}>
         {breedPhotos()}
      </div>

   </div>
}


export type BreedsFilterFormType = {
   filterByBreed: string
   limitItems: string
}
const BreedsFilterForm: React.FC = () => {

   const submitBtn = document.getElementById('breedsFilterFormSubmitBtn')

   const dispatch = useDispatch()


   const onSubmit = (values: BreedsFilterFormType) => {
      dispatch(getBreedsListThunk(values))
      console.log('formik');
   }

   const clickOnSubmit = () => {
      if (submitBtn !== null)
         submitBtn.click()
   }

   return <div className={classes.breedsFilterForm}>
      <Formik
         initialValues={{ filterByBreed: '', limitItems: '5' }}
         onSubmit={onSubmit}
      >{(props) => (
         <form onSubmit={props.handleSubmit}>
            <button type='button'>Back</button>
            <span>BREEDS</span>
            <Field as="select" name="filterByBreed">
               <option value="All Breeds">All Breeds</option>
               <option value="Abyssinian">Abyssinian</option>
               <option value="Aegean">Aegean</option>
            </Field>
            <Field as="select" name="limitItems" onChange={(e: any) => { props.handleChange(e); clickOnSubmit() }}>
               <option value="5">Limit: 5</option>
               <option value="10">Limit: 10</option>
               <option value="15">Limit: 15</option>
               <option value="20">Limit: 20</option>
            </Field>
            <button type='button'>Sorting from Z to A</button>
            <button type='button'>Sorting from A to Z</button>
            <button id='breedsFilterFormSubmitBtn' type='submit'>s</button>
         </form>
      )}

      </Formik>
   </div>

}


const BreedsPage: React.FC = () => {

   const breedsList = useSelector(getBreedsList)

   const dispatch = useDispatch()
   useEffect(() => {
      const values: BreedsFilterFormType = {
         filterByBreed: '',
         limitItems: '10'
      }
      dispatch(getBreedsListThunk(values))

   }, [])
   return <div className={classes.breedsPage}>
      <BreedsFilterForm />
      <div className={classes.wrapper}>
         <BreedsList breedsList={breedsList} />
      </div>
   </div>
}

export default BreedsPage