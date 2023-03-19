import axios, {AxiosRequestConfig, AxiosInstance } from "axios";

const axiosConfig: AxiosRequestConfig = {
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
		language: "ko-KR"
	}
}
const instance: AxiosInstance = axios.create(axiosConfig);

export default instance;