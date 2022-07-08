import { instance } from "./api"



export const breedsAPI = {

   async getBreads(limit = '5', page = '0', breed = '') {
      const qBreed = breed !== '' ? `attach_breed=${breed}` : ''
      const response = await instance.get(`breeds?limit=${limit}&page=${page}&${qBreed}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
            'type': 'xhr'
         }
      })
      return response.data
   }
}
