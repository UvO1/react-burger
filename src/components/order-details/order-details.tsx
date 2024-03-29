import OrderDetailsStyles from "./order-details.module.css";
import doneImg from "../../images/done.svg";
import { useSelector } from "../../services/hooks";
import { TViewOrderDetails } from "../../services/reducers/order";


function OrderDetails() {
	const order: TViewOrderDetails = useSelector((store) => store.order);

	return (
		<div className={OrderDetailsStyles.wrap} data-testid="ismodal">
			<p className="text text_type_digits-large mt-10">{order.number}</p>
			<p className="text text_type_main-medium mt-8">идентификатор заказа</p>
			{order.success && (
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
