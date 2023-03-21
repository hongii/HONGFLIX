import React from 'react'
import styled from 'styled-components';
import * as S from './FooterStyle'; //S-dot naming convention

export default function Footer() {
	return (
		<S.FooterContainer>
			<S.FooterContent>
				<S.FooterLinkContainer>
					<S.FooterLinkTitle>넷플릭스 대한민국</S.FooterLinkTitle>
					<S.FooterLinkContent>
						<S.FooterLink href="https://help.netflix.com/ko/">고객 센터</S.FooterLink>
						<S.FooterLink href="https://help.netflix.com/legal/notices" >법적 고지</S.FooterLink>
						<S.FooterLink href="https://help.netflix.com/legal/corpinfo" >회사 정보</S.FooterLink>
						<S.FooterLink href="https://help.netflix.com/legal/termsofuse">이용 약관</S.FooterLink>
						<S.FooterLink href="https://jobs.netflix.com/" >입사 정보</S.FooterLink>
						<S.FooterLink href="https://ir.netflix.net/ir-overview/profile/default.aspx">투자 정보</S.FooterLink>
						<S.FooterLink href="https://help.netflix.com/ko/legal/privacy">개인 정보</S.FooterLink>
						<S.FooterLink href="https://help.netflix.com/ko/contactus">문의 하기</S.FooterLink>
					</S.FooterLinkContent>
					<S.FooterDescContainer>
						<S.FooterDescRights>
							@Netflix RIGHTS RESERVED.
						</S.FooterDescRights>
					</S.FooterDescContainer>
				</S.FooterLinkContainer>
			</S.FooterContent>
		</S.FooterContainer>
	)
}
