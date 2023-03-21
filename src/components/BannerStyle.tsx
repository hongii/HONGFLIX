import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height:100vh;
	width:100%;
	overflow-y:hidden;
`

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
`
const BackBtn = styled.button`
	display: inline-block;
	position: absolute;
	top:1.5rem;
	left:0.5rem;
	padding:0 0.5rem 0.5rem 0.5rem;
	teat-align:center;
	border-radius:50%;
	background-color:rgba(74,74,74,1);
	whidth:43px;
	height:43px;
	color:white;
	text-opacity:0.8;
	z-index:1000;
	font-size:2.3rem;
	font-weight:bold;
`
const Iframe = styled.iframe`
	width: 100%;
	height: 100%;
	z-index:-1;
	border:none;

	&::after{
		content:"";
		position: absolute;
		top:0;
		left:0;
		width:100%;
		height:100%;
	}
`

const NoVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  width: 100%;
  height: 100%;
  color:#666;
`

export {
  Container,
  HomeContainer,
  BackBtn,
  Iframe,
  NoVideo,


};