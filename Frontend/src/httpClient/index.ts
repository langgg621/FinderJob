import axios from "axios";
import { BASE_URL } from "../constants/api";
import { KEY_STORAGE } from "../constants/storage";
import { getItemObjectAsyncStorage } from "../utils/asyncStorage";

const httpClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Accept: '*/*',
        
    }
})

let token
const getToken = async () => {
  token = await getItemObjectAsyncStorage(KEY_STORAGE.SAVED_INFO);
} 
httpClient.interceptors.request.use(function (config) {
  getToken()
  config.headers.Authorization = token ? `Bearer ${token.token}` : '';
  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    console.log('API', response);

    return response;
  },
);

export default httpClient