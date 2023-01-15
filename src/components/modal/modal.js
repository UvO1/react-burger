import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");


function Modal(props){
	const [isOpen, setOpen] = React.useState(true);
	const modalRef = React.useRef();

	function handleCloseModal(){
		return props.onClosed();
	}

	const handleCloseModalKey = event => {
		console.log(event);
		if (event.key === "Escape"){
			return props.onClosed();
		}
	};

	React.useEffect(()=>{
		modalRef.current.focus();
	});

	return ReactDOM.createPortal (
		<div onKeyDown={handleCloseModalKey} tabIndex={-1} ref={modalRef}>	
			<div className={ModalStyles.wrap} >
				<div className={`${ModalStyles.modal} pb-15`}>
					<div className={`${ModalStyles.head} mt-10 ml-10 mr-10`}>
						<p className="text text_type_main-large">
							{props.title}
						</p>
						<CloseIcon type="primary" onClick={handleCloseModal} />
					</div>
					{props.children}
				</div>
			</div>
			<ModalOverlay onClick={handleCloseModal} />
		</div>,
		modalRoot);
}

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.object,
	children: PropTypes.object
};

export default Modal;