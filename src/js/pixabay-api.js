import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const ENDPOINT = 'api/';
const API_KEY = '44646887-2aa33964a79eef97580c1a22f';
axios.defaults.baseURL = BASE_URL;

export default async ({ q = '', page = 1, pageSize = 15 } = {}) => {
  try {
    const response = await axios.get(ENDPOINT, {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: pageSize,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Sorry, something went wrong with the API request.');
  }
};
