import { instance } from "./api"

export const breedsAPI = {

   async getBreads(limit: number | null, page: number | null, order = 'ASC' as string | null) {
      const qPage = page || page === 0 ? `&page=${page}` : ''
      const qOrder = order === 'DESC' ? `&order=${order}` : ''
      try {
         const response = await instance.get(`breeds?limit=${limit}${qPage}${qOrder}`, {
            headers: {
               'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d'
            }
         })

         return response.data
      } catch (error) {
         return []
      }

   },

   async getBreadByName(name: string) {
      try {
         const response = await instance.get(`breeds/search?q=${name}`, {
            headers: {
               'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d'
            }
         })

         return response.data
      } catch (error) {
         return []
      }

   },

   async getByBreed(filterByBreed: string, limit = 5) {
      const response = await instance.get(`images/search?breed_ids=${filterByBreed}&limit=${limit}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d'
         }
      })
      console.log(response.data);

      return response.data
   },

   async getTotalBreeds() {
      const response = await instance.get('breeds', {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
            'type': 'xhr'
         }
      })

      return response
   }

}
