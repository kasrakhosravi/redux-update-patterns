/**
 * Dependencies
 */
import axios from 'axios';

/**
 * Config / Environment
 */
const API_URL = 'https://sheetsu.com/apis/v1.0bu/7e21ba597657';

/**
 * Create instance of axios
 * with appropriate base url (pointing to the API)
 */
const request = axios.create({
  baseURL: API_URL,
});

/**
 * Get all outfits
 */
export function getOutfits() {
  return request.get('/')
  .then(({ data }) => data);
}

/**
 * Search for outfits
 */
// export function searchOutfits({ term = '', filters = [] }) {
//   return request.get('/search', {
//     params: {
//       description: term || undefined,
//       tags: filters.join(',') || undefined
//     }
//   })
//   .then(({ data }) => data);
// }
