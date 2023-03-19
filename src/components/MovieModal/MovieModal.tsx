import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';
import MovieResults from '../../api/responseMovie'

interface Props {
	movieSelected: MovieResults;
	setModalOpen: (type: boolean) => void
}

export default function MovieModal({movieSelected, setModalOpen }: Props) {
	/* useRef() 훅을 이용하여 모달창 바깥부분을 누르면 모달창을 닫게 만드는 커스텀 훅 먼둘가 */
	let ref = useRef<HTMLInputElement>(null);//"modal"이라는 클래스가 있는 DOM객체를 포함하는지 판별하기 위한 객체
										//=> Ref객체의 .current 값이 특정 DOM("modal"클래스를 가진 DOM)을 가리키게 된다.
										//ex) console.log(ref.current) : <div class="modal">...</div>
	useOnClickOutside(ref, setModalOpen);


	return (
		/* movieSelected에서 가져올 정보 => backdrop_path, title, overview, 
		name, release_date, first_air_date, vote_average */

		<div className='presentation'>
			<div className='wrapper-modal'>
				{/* modal에 해당하는 DOM 객체(↓)에 ref속성값으로 위에서 만든 ref객체를 넣어준다. */}
				<div className='modal' ref={ref}>
					<span className='modal-close' onClick={() => { setModalOpen(false) }}>X</span>
					
					<img className='modal_poster-img'
						src={`https://image.tmdb.org/t/p/original${movieSelected.backdrop_path}`}
						alt='modal_poster-img' />
					<div className='modal_content'>
						<p className='modal_details'>
							<span className='modal_user-perc'>
								{Math.round(movieSelected.vote_average * 10) }% 일치
							</span>
							<span className='release_date'>
								{	movieSelected.release_date
									? movieSelected.release_date
									: movieSelected.first_air_date}</span>
							<h2 className='modal_title'>{movieSelected.title ? movieSelected.title : movieSelected.title}</h2>
							<p className='modal_overview'>평점 : {movieSelected.vote_average}</p>
							<p className='modal_overview'>{movieSelected.overview }</p>
						</p>
					</div>
				</div>
			</div>

		</div>
	)
}
