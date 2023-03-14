import React, {useEffect} from 'react'

/* MovieModal.js 에서의 className="modal"인 DOM객체인지 아닌지 판별하고,
맞다면 계속 모달창을 띄우고 아니라면(외부를 클릭한 것이라면) 모달창을 닫아주는 커스텀 훅*/
const useOnClickOutside = (ref, setModalOpen) => {
	
	useEffect(() => {
		const modalOnOffListener = (event) => {
			/* 클릭한 부분이 modal창 내부인 경우 */
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}

			/* 클릭한 부분이 modal창 외부인 경우 */
			else {
				setModalOpen(false);
			}
		}
		document.addEventListener("mousedown", modalOnOffListener);
		document.addEventListener("touchstart", modalOnOffListener);
		//cf. mousedown event => 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생 
		// 		click evnet => 사용자가 해당 element를 클릭했을 때(버튼을 눌렀다가 떼었을 때) 발생


		return () => {
			document.removeEventListener("mousedown", modalOnOffListener);
			document.removeEventListener("touchstart", modalOnOffListener);
		}
	}, [ref, setModalOpen])
};

export default useOnClickOutside;
