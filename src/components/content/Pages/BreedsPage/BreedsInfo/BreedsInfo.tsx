import React, { useEffect } from "react"
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../../../../hooks/useAppDispatch";
import { IBreed } from "../../../../../models/models";
import { actions, getBreedById, getBreedsNumbersById } from "../../../../../redux/breeds-reducer";
import { getBreedInfoPhotos, getInfoPhotoNumber, getIsFetching } from "../../../../../redux/breeds-selectors";
import { getIsBlack } from "../../../../../redux/theme-selectors";
import Preloader from "../../../../common/Preloader";
import classes from './BreedsInfo.module.scss'

const notFoundImage = 'https://s5.favim.com/orig/151213/avatar-kot-profil-gav-Favim.ru-3761175.jpg'

let selecterBtn = 0

const BreedsInfo: React.FC = () => {
   const location = useLocation()
   const idBreed = location.pathname.split('/')[3]

   //number of displaed picture
   const photoNumber = useSelector(getInfoPhotoNumber)

   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getBreedById(idBreed))
   }, [dispatch, idBreed])

   useEffect(() => {
      dispatch(getBreedsNumbersById())
   }, [dispatch])

   const breedPhotos = useSelector(getBreedInfoPhotos)
   console.log('breedPhotos', breedPhotos);

   let breed: IBreed

   let url = ''
   let name = ''
   let alt = ''
   let temperament = ''
   let origin = ''
   let life_span = ''
   let weight = ''
   if (breedPhotos[photoNumber] && breedPhotos[photoNumber].breeds) {
      //@ts-ignore
      breed = breedPhotos[photoNumber].breeds[0] || {} as IBreed


      url = breedPhotos[photoNumber] ? breedPhotos[photoNumber].url : notFoundImage
      name = breed ? breed.name : ''
      alt = breed ? breed.alt_names ? breed.alt_names : breed.name : ''
      temperament = breed ? breed.temperament : ''
      origin = breed ? breed.origin : ''
      life_span = breed ? breed.life_span : ''
      weight = breed ? breed.weight.metric : ''
   }


   //change displaed picture
   const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(actions.toggleIsFetching(true))
      dispatch(actions.setInfoPhotoNumber(Number((e.target as HTMLElement).innerText)))
      selecterBtn = Number((e.target as HTMLElement).innerText)
      setTimeout(() => {
         dispatch(actions.toggleIsFetching(false))
      }, 200)

   }

   //creating buttons as many as pictures
   const buttons = () => {
      if (breedPhotos) {
         return breedPhotos.map((breed, index) => {
            return <button
               type="button"
               className={`${selecterBtn === index ? classes.selected : ''}`}
               onClick={onBtnClick} key={index}
            >{index}</button>
         })
      }
      return ''
   }

   const isFetching = useSelector(getIsFetching)
   const isBlack = useSelector(getIsBlack)

   return <div className={`${classes.infoPage} ${isBlack && classes.black}`}>
      <div className={classes.imagesWrapper}>
         {isFetching &&
            <Preloader />}
         {!isFetching &&
            <img src={url} alt={alt} />}
         <div className={classes.btnContainer}>
            <div>
               {buttons()}
            </div>
         </div>
      </div>
      <div className={classes.infoWrapper}>
         <h3><span>{name}</span></h3>
         <p>Family companion cat</p>
         <div className={classes.info}>
            <dl>
               <dt>Temperament: </dt>
               <dd>{temperament}</dd>
            </dl>
            <dl>
               <div>
                  <dt>Origin: </dt>
                  <dd>{origin}</dd>
               </div>
               <div>
                  <dt>Weight: </dt>
                  <dd>{weight} kgs</dd>
               </div>
               <div>
                  <dt>Life span: </dt>
                  <dd>{life_span} years</dd>
               </div>
            </dl>
         </div>
      </div>
   </div>
}

export default BreedsInfo 