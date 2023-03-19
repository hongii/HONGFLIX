import React from 'react'
import styled from 'styled-components';

export default function Footer() {
	return (
		<FooterContainer>
			<FooterContent>
				<FooterLinkContainer>
					<FooterLinkTitle>넷플릭스 대한민국</FooterLinkTitle>
					<FooterLinkContent>
						<FooterLink href="https://help.netflix.com/ko/">고객 센터</FooterLink>
						<FooterLink href="https://help.netflix.com/legal/notices" >법적 고지</FooterLink>
						<FooterLink href="https://help.netflix.com/legal/corpinfo" >회사 정보</FooterLink>
						<FooterLink href="https://help.netflix.com/legal/termsofuse">이용 약관</FooterLink>
						<FooterLink href="https://jobs.netflix.com/" >입사 정보</FooterLink>
						<FooterLink href="https://ir.netflix.net/ir-overview/profile/default.aspx">투자 정보</FooterLink>
						<FooterLink href="https://help.netflix.com/ko/legal/privacy">개인 정보</FooterLink>
						<FooterLink href="https://help.netflix.com/ko/contactus">문의 하기</FooterLink>
					</FooterLinkContent>
					<FooterDescContainer>
						<FooterDescRights>
							@Netflix RIGHTS RESERVED.
						</FooterDescRights>
					</FooterDescContainer>
				</FooterLinkContainer>
			</FooterContent>
		</FooterContainer>
	)
}

const FooterContainer = styled.div`
	display: flex;
	justify-content:center;
	align-items: center;
	padding: 90px 40px 3rem;
	border-top: 1px solid rgb(25,25,25);
	width:100%;
	position:relative;
	z-index: 100;

	@media (min-width:1200px){
		max-width:1200px;
		margin:0 auto;
	}
`

const FooterContent = styled.div`
	flex: 1 0 auto;
`;

const FooterLinkContainer = styled.div`
	display:flex;
	flex-direction:column;
	width: 100%;
	padding-left: 3rem;
`

const FooterLinkTitle = styled.div`
	color: gray;
	font-size: 19px;
	font-weight:700;
	margin-bottom:30px;
	
	@media (min-width:900px){
		margin-bottom:45px;
	}
`

const FooterLinkContent = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 20px;
`

const FooterLink = styled.a`
	color: gray;
	font-size: 14px;
	width: 40%;
	margin-bottom: 15px;
	text-decoration: none;

	&:hover{
		text-decoration:underline;
	}
	
	@media (min-width:900px){
		width:23%;
		margin-bottom:25px;
	}
`

const FooterDescContainer = styled.div`
	margin-top: 20px;
`

const FooterDescRights = styled.h2`
	font-size:15px;
	color:white;
	text-align:center;
	padding-right: 3rem;
`