import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASEURL;
const axiosInstance = axios.create({
    baseURL: baseUrl
  });

export default axiosInstance;