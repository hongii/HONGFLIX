import React,{useEffect, useState, useRef} from 'react'
import "./Nav.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
	let [navBlackShow, setShow] = useState<boolean>(false);//nav바의 배경색을 black으로(#111) 보이게 할지 말지 상태를 저장하는 state변수
	let [searchValue, setSearchValue] = useState<string>("");
	let [isClickSearch, setClickSearch] = useState<boolean>(false);
	let navigate = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);

	/* scroll 이벤트 리스너 등록 */
	useEffect(() => {
		window.addEventListener("scroll", (navScrollHandler))

		function navScrollHandler() {
			if (window.scrollY > 50) {//scroll을 내리면 nav바의 배경색이 #111으로 보이도록
				setShow(true);
			}
			else {
				setShow(false);
			}
		}
		return () => {//Nav 컴포넌트를 unload 할때에는 등록한 이벤트 리스너를 해제시킨다.
			window.removeEventListener("scroll", navScrollHandler);	
		}
	});

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
		navigate(`/search?q=${e.target.value}`);
	}

	const clickHandler = () => {
		setClickSearch(!isClickSearch)
		searchRef.current!.focus();
	}

	return (
		<nav className={`nav ${navBlackShow && "nav--black"}`}>
			<div
				style={{backgroundImage:"url('https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg')"}}
				className="nav__logo"
				onClick={() => {navigate("/") }}
			/>
			
			<div className='navSecondary'>
				<div className="navSecondary__searchForm">
					<button className={`navSecondary__searchForm--icon ${ isClickSearch && "icon--active"}`} onClick={clickHandler}><FaSearch/></button>			
					<input type='text' className={`navSecondary__searchForm--input ${ isClickSearch && "input--active"}`} value={searchValue}
						onChange={changeHandler} placeholder="영화를 검색하세요." ref={searchRef}/> 
				</div>
				
				<img
				alt="User profile"
				src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
				className='nav__profileIconImg'
				/>
			</div>
			
		</nav>
	)
}
