import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useDebounce } from '../../hooks/useDebounce';
import './SearchPage.css';
import { MovieResults } from '../../api/responseMovie';

export default function SearchPage() {
	const [searchResults, setSearchResults] = useState<Array<MovieResults>>([]);
	const useQuery = () => {/* useLocation() 객체 정보 중 search부분의 정보를 가져온다. => search : "?q=아이언맨"*/
		const decodeURL = decodeURI(useLocation().search);//한글 깨짐 방지
		return new URLSearchParams(decodeURL);
	}
	
	let query = useQuery();/* ex) "http://localhost:3000/search?q=아이언맨" 이라면, 변수 query에는 "?q=아이언맨"이 들어간다.*/
	let searchTerm = query.get("q"); /* searchTerm에는 q에 해당하는 값인 "아이언맨"이 저장된다. */
	let debouncedSearchTerm = useDebounce(searchTerm as string, 500);//0.5초 동안 기다림
	let navigate = useNavigate();

	useEffect(() => {
		if (debouncedSearchTerm) {
			fetchSearchMovie(debouncedSearchTerm);
		}
		else {
			setSearchResults([])
		}
	}, [debouncedSearchTerm])

	const fetchSearchMovie = async (debouncedSearchTerm: string) => {
		// console.log(debouncedSearchTerm);
		try {
			const request = await axios.get(`/search/multi?include_adult=false&query=${debouncedSearchTerm}`);
			setSearchResults(request.data.results);
		}
		catch(error) {
			console.log("error: ", error);
		}
	}

	const renderSearchResults = () => {
		/* 찾는 영화 정보가 있는 경우*/
		if (searchResults.length > 0) {
			if (searchResults.length === 1){
				if (searchResults[0].media_type === "person" || searchResults[0].media_type === "tv" ||  searchResults[0].backdrop_path === null) {
					return(
						<section className='search__container'>
							<section className='no-results'>
								<div className='no-results__text'>
									<p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 해당하는 영화가 없습니다.</p>
								</div>
							</section>
						</section>
					)
				}
			}
			else {
				return (
					<section className='search__container'>
						{searchResults.map((movie: MovieResults) => {
							if (movie.backdrop_path !== null && movie.media_type !== "person" && movie.media_type !== "tv") {
								const movieImageURL = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
								return (
									<div className='movie' key={movie.id}>
										<div className='movie__column--poster'
											onClick={() => { navigate(`/${movie.id}`) }}>
											<img src={movieImageURL} alt="no movie image"
												className="movie__poster" />
										</div>
									</div>
								)
							}
						})}
					</section>
				)
			}
		}
		
		/* 찾는 영화 정보가 없는 경우*/
		else {
			return (
				<section className='search__container'>
					<section className='no-results'>
						<div className='no-results__text'>
							<p>찾고자 하는 검색어 "{debouncedSearchTerm}"에 해당하는 영화가 없습니다.</p>
						</div>
					</section>
				</section>
			)
		} 
	}

	return renderSearchResults();
}
