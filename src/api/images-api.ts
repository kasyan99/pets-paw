import { GalleryFilterFormType, ImgTypeType, OrderType } from "../redux/images-reducer"
import { instance } from "./api"



export const imagesAPI = {

   async getImages(filter: GalleryFilterFormType, currentPage: number) {
      const response = await instance.get(`images/search?breed_id=abys&page=0&limit=5&order=ASC&mime_types=jpg,png`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   }
}
