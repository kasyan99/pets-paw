import { instance } from "./api"



export const votingAPI = {

   async setVote(id: string, value: 0 | 1) {

      const response = await instance.post(`votes`, {
         "image_id": `${id}`,
         "value": value,
         "sub_id": 'kas_99'
      }, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async getVotes(limit = null as number | null, page = 0) {
      const pLimit = limit ? `&limit=${limit}` : ''
      const response = await instance.get(`votes?sub_id=kas_99${pLimit}&page=${page}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async deleteVote(vote_id: string) {

      const response = await instance.delete(`votes/${vote_id}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async addToFavourite(id: string) {

      const response = await instance.post(`favourites`, {
         "image_id": `${id}`,
         "sub_id": 'kas_99'
      }, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async getFavourites(limit = 5, page = 0) {
      const response = await instance.get(`favourites?sub_id=kas_99&limit=${limit}&page=${page}`, {

         // const response = await instance.get(`favourites?sub_id=kas_99`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async deleteFavourites(id: string) {

      const response = await instance.delete(`favourites/${id}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })


      return response
   },

}
