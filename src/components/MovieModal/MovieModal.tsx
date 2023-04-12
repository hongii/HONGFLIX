import React, { useRef, useState } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';
import type { MovieResults } from '../../api/responseMovie';
import YouTube, { YouTubeProps } from 'react-youtube';

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
	const [isVideoPlay, setVideoPlay] = useState<boolean>(true)

	const onPlayerError: YouTubeProps['onError'] = (event) => {
		console.log(event.data)
    if (event.data == 2 || event.data == 5 || event.data == 100 || event.data == 101 || event.data == 150){
			setVideoPlay(false)
		}
  }

	const onPlayerEnd: YouTubeProps['onEnd'] = (event) => {
		//자동 재생 기능(영상이 끝난 후, 다시 영상 재생)
		event.target.playVideo();
	}	

  const opts: YouTubeProps['opts'] = {
    height: '450',
		width: '100%',
    playerVars: {
      autoplay: 1,
			mute: 0,
			modestbranding: 1,
			rel: 0,
			loop: 1,
    },
  };

	return (
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
						:
							isVideoPlay
							? <YouTube
									videoId={movieSelected?.videos?.results[0]?.key}    
									opts={opts}
									onError={onPlayerError}
									onEnd={onPlayerEnd}/>
							: <img className='modal__poster--img'
									src={`https://image.tmdb.org/t/p/original${movieSelected.backdrop_path}`}
									alt='modal__poster--img' />
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
