import { instance } from "./api"



export const breedsAPI = {

   async getBreads(limit: number | null, page: number | null, filterByBreed = '', order = 'ASC') {
      // const qBreed = filterByBreed !== '' ? `&attach_breed=${filterByBreed}` : ''
      const qPage = page || page === 0 ? `&page=${page}` : ''

      const response = await instance.get(`breeds?limit=${limit}${qPage}&order=${order}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
            'type': 'xhr'
         }
      })

      return response.data
   },

   async getByBreed(filterByBreed: string) {
      const response = await instance.get(`images/search?breed_ids=${filterByBreed}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
            'type': 'xhr'
         }
      })

      return response.data
   }
   // async getBeedsNames(){
   //    const response = await instance.get(`breeds {
   //       headers: {
   //          'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
   //          'type': 'xhr'
   //       }
   //    })


   // }
}
