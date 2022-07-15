import { instance } from "./api"



export const votingAPI = {

   async setVote(id: string, value: 0 | 1) {

      const response = await instance.post(`votes`, {
         "image_id": `${id}`,
         "value": value
      }, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response
   },

   async getVotes(limit = 5, page = 0) {

      const response = await instance.get(`votes?limit=${limit}&page=${page}`, {
         headers: {
            'x-api-key': 'f320d5bf-02ff-4099-9a76-4d3e9cce3e0d',
         }
      })

      return response.data
   },

}
