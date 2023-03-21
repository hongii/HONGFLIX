import React, { useState, useEffect } from 'react'
import requests from '../api/requests';
import axios from '../api/axios';
import './Banner.css';
import * as S from './BannerStyle';
import { TbAlertCircle } from 'react-icons/tb'
import type { MovieResults } from '../api/responseMovie';

const Banner: React.FC = () => {
	let [movie, setMovie] = useState<MovieResults | null>(null);
	let [isPlayClicked, setPlayClicked] = useState<boolean>(false);
	
	useEffect(() => {
		fetchData();

		return () => {
			setPlayClicked(false);
		}
	}, []);
	
	const fetchData = async() => {
		//현재 상영중인 영화 정보들을 가져오기
		const request = await axios.get(requests.fetchNowPlaying);//비동기 처리


		//가져온 여러개의 영화들 중 하나의 영화 id를 랜덤으로 가져오기
		const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)].id;

		//랜덤으로 가져온 영화의 세부정보를 가져오기(video 정보도 포함시키기) => get요청으로 가져온 정보 중 data 정보를 movieDetail 변수에 넣는다.
		const { data: movieDetail,...metaData } = await axios.get(`/movie/${movieId}`, {
			params: { append_to_response: "videos" }
		});
		
		console.log(movieDetail);
		// console.log(metaData);
		setMovie(movieDetail);
	}

	/* 재생 버튼을 누르지 않았을때 보이는 컴포넌트 */
	if (!isPlayClicked) {
		return (
			//css BEM 적용
			<header className='banner' 
			style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`}}>
				<div className='banner__contents'>
					<h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_title}</h1>
					
					<div className='banner__buttons'>
						<button className='banner__button play' onClick={()=>{setPlayClicked(true)}}>
							<div style={{ marginRight: "10px" }}>▶</div>
							<div>재생</div>
						</button>
						<button className='banner__button info'>
							<div style={{ marginRight: "10px" }}>ⓘ</div>
							<div>상세정보</div>
						</button>
					</div>
					
					<h1 className='banner__description'>{ movie?.overview}</h1>
				</div>
				<div className='banner__fadeBottom'></div>
			</header>
		)
	}
	
	else {
		// styled-components 적용
		return (
			<S.Container>
				<S.HomeContainer>
					<S.BackBtn onClick={() => {setPlayClicked(false)}}>↩</S.BackBtn>
					{
						movie?.videos?.results.length == 0
						? <S.NoVideo><TbAlertCircle style={{color:"#666",paddingRight:"10px"}}/> No Videos Found.</S.NoVideo>
						: <S.Iframe
							width="640" height="360"
							src={`https://www.youtube.com/embed/${movie?.videos?.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie?.videos?.results[0].key}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
							allowFullScreen>	
						</S.Iframe>
						
					}
				</S.HomeContainer>
			</S.Container>
		)
	}
}
export default Banner;