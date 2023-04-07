import React, { useEffect, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';
import type { MovieResults } from '../../api/responseMovie';
import { Iframe } from '../BannerStyle';

interface Props {
	movieSelected: MovieResults;
	setModalOpen: (type: boolean) => void;
	rowID: string;
}

export default function MovieModal({movieSelected, setModalOpen, rowID }: Props) {
	/* useRef() 훅을 이용하여 모달창 바깥부분을 누르면 모달창을 닫게 만드는 커스텀 훅 만들기 */
	let ref = useRef<HTMLDivElement>(null);//"modal"이라는 클래스가 있는 DOM객체를 포함하는지 판별하기 위한 객체
										//=> Ref객체의 .current 값이 특정 DOM("modal"클래스를 가진 DOM)을 가리키게 된다.
										//ex) console.log(ref.current) : <div class="modal">...</div>
	useOnClickOutside({ref, setModalOpen});

	return (
		/* movieSelected에서 가져올 정보 => backdrop_path, title, overview, 
		name, release_date, first_air_date, vote_average */

		<div className='presentation'>
			<div className='wrapper-modal'>
				{/* modal에 해당하는 DOM 객체(↓)에 ref속성값으로 위에서 만든 ref객체를 넣어준다. */}
				<div className='modal' ref={ref}>
					<span className='modal--close' onClick={() => { setModalOpen(false) }}>X</span>
					
					{
						movieSelected.media_type === "tv" || movieSelected?.videos?.results.length === 0 || movieSelected?.videos === undefined || rowID === "OG" 
						? <img className='modal__poster--img'
						src={`https://image.tmdb.org/t/p/original${movieSelected.backdrop_path}`}
						alt='modal__poster--img' />
						:<Iframe className='iframe'
							height="450"
							src={`https://www.youtube.com/embed/${movieSelected?.videos?.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movieSelected?.videos?.results[0].key}`}
							name="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;">	
						</Iframe>
						
					}

					<div className='modal__content'>
						<div className='modal__details'>
							<span className='modal__user-perc'>
								{Math.round(movieSelected.vote_average * 10) }% 일치
							</span>
							<span className='release__date'>
								{	movieSelected.release_date
									? movieSelected.release_date
									: movieSelected.first_air_date}</span>
							<h2 className='modal__title'>{movieSelected.title ? movieSelected.title : movieSelected.name}</h2>
							<p className='modal__overview'>평점 : {movieSelected.vote_average}</p>
							<p className='modal__overview'>{movieSelected.overview }</p>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}
