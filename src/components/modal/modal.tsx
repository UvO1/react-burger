import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ReactNode, FC} from 'react';

const modalRoot: HTMLElement | null = document.getElementById("react-modals");
interface IModal{
	title: string;
	onClosed: () => void;
	children: ReactNode;
};

const Modal: FC<IModal> = ({onClosed, title, children}) => {
	const modalRef = React.useRef<HTMLInputElement>(null);

	function handleCloseModal() {
		return onClosed();
	}

	const handleCloseModalKey: React.KeyboardEventHandler<HTMLDivElement> | undefined = (event: React.KeyboardEvent) => {
		if (event.key === "Escape") {
			return onClosed();
		}
	};

	React.useEffect(() => {
		if(modalRef.current){
			modalRef.current.focus();
		}
	});

	return ReactDOM.createPortal(
		<div onKeyDown={handleCloseModalKey} tabIndex={-1} ref={modalRef}>
			<div className={ModalStyles.wrap}>
				<div className={`${ModalStyles.modal} pb-15`}>
					<div className={`${ModalStyles.head} mt-10 ml-10 mr-10`}>
						<p className="text text_type_main-large">{title}</p>
						<CloseIcon type="primary" onClick={handleCloseModal} />
					</div>
					{children}
				</div>
			</div>
			<ModalOverlay onClick={handleCloseModal} />
		</div>,
		modalRoot!
	);
}

export default Modal;
