import React, {useEffect} from 'react'

interface Props{
	ref: React.RefObject<HTMLElement>;
	setModalOpen: (type: boolean) => void;
}

/* MovieModal.ts 에서의 className="modal"인 DOM객체인지 아닌지 판별하고,
맞다면 계속 모달창을 띄우고 아니라면(외부를 클릭한 것이라면) 모달창을 닫아주는 커스텀 훅*/
const useOnClickOutside = ({ref, setModalOpen}: Props) => {
	
	useEffect(() => {
		const modalOnOffListener = (event: CustomEvent<MouseEvent> | CustomEvent<TouchEvent>) => {
			/* 클릭한 부분이 modal창 내부인 경우 */
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
				return;
			}

			/* 클릭한 부분이 modal창 외부인 경우 */
			else {
				setModalOpen(false);
			}
		}
		document.addEventListener("mousedown", (modalOnOffListener) as EventListener);
		document.addEventListener("touchstart", (modalOnOffListener) as EventListener);
		//cf. mousedown event => 사용자가 해당 element에서 마우스 버튼을 눌렀을 때 발생 
		// 		click evnet => 사용자가 해당 element를 클릭했을 때(버튼을 눌렀다가 떼었을 때) 발생


		return () => {
			document.removeEventListener("mousedown", (modalOnOffListener) as EventListener);
			document.removeEventListener("touchstart", (modalOnOffListener) as EventListener);
		}
	}, [ref, setModalOpen])
};

export default useOnClickOutside;
