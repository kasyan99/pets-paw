import { GalleryFilterFormType, ImgTypeType, OrderType } from "../redux/images-reducer"
import { instance } from "./api"



export const imagesAPI = {
   //images/search?breed_id=abys&page=0&limit=5&order=ASC&mime_types=jpg,png
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

      const response = await instance.get(`images/search?page=${currentPage}&limit=${limitItems}&order=${order}&mime_types=${qType}${breed_id}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   // async getTotalUsersCount() {
   //    const response = await instance.get(`images/search?page=0&limit=5&order=ASC&mime_types=png`, {
   //       headers: {
   //          'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
   //          'type': 'xhr'
   //       }
   //    })

   //    return response.headers
   // }
}
