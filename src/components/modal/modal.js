import React from 'react';
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay/modal-overlay';
import ModalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

const modalRoot = document.getElementById("react-modals");


function Modal(){
	const title = "Детали ингредиента"
	return (
		<>
			<div className={ModalStyles.wrap}>
				<div className={`${ModalStyles.modal} pb-15`}>
					<div className={`${ModalStyles.head} mt-10 ml-10 mr-10`}>
						<p className="text text_type_main-large">
							{title}
						</p>
						<CloseIcon type="primary" />
					</div>
					<IngredientDetails/>
				</div>
			</div>
			<ModalOverlay/>
	</>);
}

export default Modal;