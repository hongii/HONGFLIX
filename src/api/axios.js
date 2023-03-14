import axios from "axios";

/* axios 인스턴스화 => 중복된 부분을 계속해서 입력하지 않아도 된다. */
const instance = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
		language: "ko-KR"
	}
});

export default instance;