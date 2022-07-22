import { GalleryFilterFormType } from "../redux/images-reducer"
import { instance } from "./api"

export const imagesAPI = {
   async getImages(filter: GalleryFilterFormType, currentPage: number) {
      const { order, filterByBreed, limitItems, type } = filter
      const breed_id = filterByBreed ? `&breed_id=${filterByBreed}` : ''
      const qType = (() => {
         switch (type) {
            case 'static':
               return 'jpg,png'
            case 'animated':
               return 'gif'
            default: return 'gif,jpg,png'
         }
      })()

      const response = await instance.get(`images/search?page=${currentPage}&limit=${limitItems}&order=${order}&mime_types=${qType}${breed_id}&sub_id=kas_99`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async getImageById(id: string) {
      const response = await instance.get(`images/${id}?sub_id=kas_99`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response.data
   },

   async uploadImage(file: File) {
      const response = await instance.post(`images/upload`, {
         "file": file,
         "sub_id": "kas_99"
      }, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
            'Content-Type': 'multipart/form-data'
         }
      })

      return response
   },

}
