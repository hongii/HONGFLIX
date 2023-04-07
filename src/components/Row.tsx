import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import MovieModal from './MovieModal/MovieModal';
import './Row.css';
import type { MovieResults } from '../api/responseMovie';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


interface Props {
	title: string;
	id: string;
	fetchURL: string;
	isLargeRow?: boolean;
}

export default function Row({ title, id, fetchURL, isLargeRow}: Props) {
	
	let [movies, setMovies] = useState<Array<MovieResults>>([]);
	let [modalOpen, setModalOpen] = useState<boolean>(false);
	let [movieSelected, setMovieSelected] = useState<MovieResults | null>(null);

	useEffect(() => {
		fetchMovieData();
	}, []);
	
	const fetchMovieData = async () => { 
		const request = await axios.get(fetchURL);
		setMovies(request.data.results);
		console.log(request.data.results)
	}

	const fetchMovieVideo = async (movie: MovieResults) => { 
		const { data: movieDetail } = await axios.get(`/movie/${movie.id}`, {
			params: { append_to_response: "videos" }
		});
		console.log(movieDetail)
		setMovieSelected(movieDetail);
	}

	const movieClickHandler = async (movie: MovieResults) => {
		if (id !== "OG" && movie.media_type !== "tv"){
			await fetchMovieVideo(movie)
		}
		else{
			console.log(movie)
			setMovieSelected(movie)
		}
		setModalOpen(true);
	}
	return (
		<section className='row'>
			<h2 className='row__subTitle'>{title}</h2>
			
			<Swiper
				modules={[Navigation, Pagination, Scrollbar]}//Navigation : 양 옆 arrow버튼을 사용할지 말지,
																														// Pagination : 슬라이드 이동할때 스크롤 위치를 표시할지 말지
				loop={true}//슬라이드 끝까지 도달한 경우, 다시 맨처음 요소를 보일지 말지
				spaceBetween={0} // <SwiperSlide> 아이템 사이의 간격
				//slidesPerView={6} //하나의 Row에 몇개의 영화를 보여줄건지 설정
				//scrollbar={{ draggable: true }}
				navigation
				pagination={{ clickable: true }}
				breakpoints={{//breakpoints는 화면크기에 따라 보여질 영화갯수와 슬라이드 버튼 한번에 몇개씩 넘어갈지 설정
					1580: { slidesPerView: 7, slidesPerGroup: 7 },
					1200: { slidesPerView: 6, slidesPerGroup: 6 },
					980: { slidesPerView: 5, slidesPerGroup: 5 },
					630: { slidesPerView: 4, slidesPerGroup: 4 },
					0:{ slidesPerView: 3, slidesPerGroup: 3 },
			}}>
				
			{
				movies.map((movie: MovieResults) => {
					// console.log("back:  ",movie.backdrop_path);
					// console.log("poster:  ",movie.poster_path); 
					if ( movie.backdrop_path && movie.poster_path ) {
						return (
						<SwiperSlide key={movie.id} className='row__mySwiper'>
							<img
								className={`row__poster ${isLargeRow && "row__poster--large"}`}
								src={`https://image.tmdb.org/t/p/original
								${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
								alt={movie.title}
								onClick={() => { movieClickHandler(movie as MovieResults) }} />
						</SwiperSlide>
						)
					}
					else {
						return;
					}
				})
			}
			</Swiper>
			
			{
				//cf. props로 전송할때 {...movieSelected}와 같이 스프레드 연산자를 이용해서도 전달 가능
				modalOpen && <MovieModal rowID={id} movieSelected={movieSelected as MovieResults} setModalOpen={setModalOpen} />
			}
		</section>
	)
}
