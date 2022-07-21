import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIsBlack } from "../../../../redux/theme-selectors"
import { actions, setCurrentFile, uploadImage } from "../../../../redux/uploading-reducer"
import { getCurrentFile, getFileName, getFilePath, getIsCat, getIsFetching } from "../../../../redux/uploading-selectors"
import Preloader from "../../../common/Preloader"
import classes from './UploadingPage.module.scss'

const UploadingPage = () => {
   const dispatch = useDispatch<any>()

   const closeModal = () => {
      dispatch(actions.toggleIsUploading(false))
   }

   const chooseFile = (e: any) => {

      dispatch(setCurrentFile(e.target))
      // dispatch(actions.setCurrentFile(e.target.files[0]))

      // dispatch(uploadImage(e.target.files[0]))
   }

   const currentFile = useSelector(getCurrentFile)

   const uploadFile = () => {
      currentFile &&
         dispatch(uploadImage(currentFile))
   }

   const fileName = useSelector(getFileName)
   const filePath = useSelector(getFilePath)
   const isFetching = useSelector(getIsFetching)
   const isCat = useSelector(getIsCat)

   const isBlack = useSelector(getIsBlack)

   return <div className={`${classes.UploadingPage} ${isBlack && classes.black}`}>
      <h2>Upload a .jpg or .png Cat Image</h2>
      <p>Any uploads must comply with the <span>upload guidelines</span> or face deletion.</p>
      <div className={`${classes.imageWrapper} ${isCat === false && classes.failure}`}>
         {isFetching &&
            <Preloader />}
         {!isFetching &&
            <>
               {filePath &&
                  <div className={classes.image}><img src={filePath} alt={filePath} /></div>}
               {!filePath &&
                  <p><span>Drag here</span> your file or <span>Click here</span> to upload</p>}
               <input type="file" name="uploadingImage" onChange={chooseFile} />
            </>}
      </div>
      <p>{fileName ? `Image File Name: ${fileName}` : 'No file selected'}</p>
      {/* <button type="button"></button> */}
      <button type='button' className={classes.btnClose} onClick={closeModal}>Close</button>
      {filePath && isCat !== false &&
         <button type="button" className={classes.btnUpload} onClick={uploadFile}><span>UPLOAD PHOTO</span></button>}
      {isCat && <div className={`${classes.result} ${classes.result_success}`}><span>Thanks for the Upload - Cat found!</span></div>}

      {isCat === false && <div className={`${classes.result} ${classes.result_failure}`}><span>No Cat found - try a different one</span></div>}
   </div>
}

export default UploadingPage