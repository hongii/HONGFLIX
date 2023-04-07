import React, { useEffect, useState } from 'react'

/* 검색창에 영화 검색시, 타이핑 할때마다 서버로 요청을 보내는 것이 아니라,
타이핑하다가 일정시간동안 입력이 되지 않으면 그 때 요청을 보내도록
입력 결과가 나타날때까지의 지연시간을 주기위해 useDebounce라는 커스텀 훅을 만든다.*/
export const useDebounce = (value,delay) => {
	
	const [debounceValue, setdebounceValue] = useState(value);
	
	useEffect(() => {
		/* mount시 실행 & value 또는 delay값이 변경될 때마다 실행 */
		const timer = setTimeout(() => {
			setdebounceValue(value)
		}, delay);
		
		return () => {
			/* useEffect 실행 전에 return부분 부터 먼저 실행된다. */
			clearTimeout(timer);
		}
	}, [value, delay]);

	return debounceValue;
}
