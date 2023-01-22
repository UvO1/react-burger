import React from "react";
import OrderDetailsStyles from "./order-details.module.css";
import doneImg from "../../images/done.svg";
import PropTypes from "prop-types";
import { OrderInfoContext } from "../../utils/ingredients-context";

function OrderDetails() {
	const {orderInfo,  setOrderInfo } = React.useContext(OrderInfoContext);

	return (
		<div className={OrderDetailsStyles.wrap}>
			<p className="text text_type_digits-large mt-10">{orderInfo.numberOrder}</p>
			<p className="text text_type_main-medium mt-8">идентификатор заказа</p>
			{orderInfo.successOrder && (  
				<>
				<img src={doneImg} className="mt-15" alt="Готово" />
				<p className="text text_type_main-default mt-15">
					Ваш заказ начали готовить
				</p>
				<p className="text text_type_main-default text_color_inactive mt-2 mb-15">
					Дождитесь готовности на орбитальной станции
				</p>
				</>
			)}
		</div>
	);
}


export default OrderDetails;
