import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import type { MovieResults } from '../../api/responseMovie';
import '../../components/Banner.css';
import * as S from '../../components/BannerStyle';
import MovieModal from '../../components/MovieModal/MovieModal';
import { TbAlertCircle } from 'react-icons/tb'

export default function DetailPage() {
	let { movieId } = useParams();
	let [movie, setMovie] = useState<MovieResults | null>(null);
	let [isPlayClicked, setPlayClicked] = useState<boolean>(false);
	let [modalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		fetchData();

		return () => {
			setPlayClicked(false);
		}
	}, []);

	const fetchData = async () => {
		const { data: movieDetail} = await axios.get(`/movie/${movieId}`, {
			params: { append_to_response: "videos" }
		});
		setMovie(movieDetail);
	}

	if (!isPlayClicked) {
		return (
			<header className='banner' 
			style={{backgroundImage:`url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`}}>
				<div className='banner__contents'>
					<h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_title}</h1>
					
					<div className='banner__buttons'>
						<button className='banner__button play' onClick={()=>{setPlayClicked(true)}}>
							<div style={{ marginRight: "10px" }}>▶</div>
							<div>재생</div>
						</button>
						<button className='banner__button info' onClick={()=>{setModalOpen(true)}}>
							<div style={{ marginRight: "10px" }}>ⓘ</div>
							<div>상세정보</div>
						</button>
					</div>
					
					<h1 className='banner__description'>{ movie?.overview}</h1>
				</div>
				<div className='banner__fadeBottom'></div>
				{
					modalOpen && <MovieModal movieSelected={movie as MovieResults} setModalOpen={setModalOpen} />
				}
			</header>
		)
	}
	
	else {
		return (
			<S.Container>
				<S.HomeContainer>
					<S.BackBtn onClick={() => {setPlayClicked(false)}}>↩</S.BackBtn>
					{
						movie?.videos?.results.length == 0
						? <S.NoVideo><TbAlertCircle style={{color:"#666",paddingRight:"10px"}}/> No Videos Found.</S.NoVideo>
						: <S.Iframe
							width="640" height="360"
							src={`https://www.youtube.com/embed/${movie?.videos?.results[0]?.key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie?.videos?.results[0]?.key}`}
							name="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;">	
						</S.Iframe>
						
					}
				</S.HomeContainer>
			</S.Container>
		)
	}
	
}
