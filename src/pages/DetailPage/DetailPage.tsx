import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

export default function DetailPage() {
	let { movieId } = useParams();
	let [movie, setMovie] = useState<any>({});
	
	useEffect(() => {
		fetchData();
	}, [movieId]);

	const fetchData = async () => {
		const request = await axios.get(`/movie/${movieId}`)
		setMovie(request.data);
	}

	if(!movie){
		return <div>로딩중...</div>
	}
	else {
		return (
			<section>
				<img	className='modal_poster-img'
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
				alt='poster image'/>
			</section>
		)
	}
	
}
