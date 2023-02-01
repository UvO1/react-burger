import React from "react";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.js";
import OrderDetails from "../order-details/order-details";
import BunConstructor from "../bun-constructor/bun-constructor";
import { useDispatch, useSelector } from "react-redux";
import {
	getOrderAction,
	HIDE_ORDER_DETAILS,
} from "../../services/actions/order";
import {
	DECREASE_BUNS,
	INCREASE_INGREDIENT,
} from "../../services/actions/ingredients";
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, ADD_BUN } from "../../services/actions/burger";
import ElementConstructor from "../element-constructor/element-constructor";

function BurgerConstructor() {
	const dispatch = useDispatch();
	const burger = useSelector((store) => store.burger);
	const order = useSelector((store) => store.order);
	const burgerPrice = React.useMemo(() => {
		let totalPrice = 0;
		if (burger.listIngredients.length > 0) {
			totalPrice = burger.listIngredients.reduce((price, element) => {
				price += element.price;
				return price;
			}, 0);
		}
		if (burger.buns) {
			totalPrice += burger.buns.price * 2;
		}
		return totalPrice;
	}, [burger]);

	function infoOrder() {
		let fetchList = [];
		burger.listIngredients.map((element) => {
			if (element.type !== "bun") {
				fetchList.push(element._id);
			}
		});
		fetchList.push(burger.buns._id);
		fetchList.push(burger.buns._id); //the same bun in one burger
		dispatch(getOrderAction(fetchList));
	}

	function handleCloseModal() {
		dispatch({
			type: HIDE_ORDER_DETAILS,
		});
	}

	const modal = (
		<Modal title="" onClosed={handleCloseModal}>
			<OrderDetails />
		</Modal>
	);

	const [, dropTarget] = useDrop({
		accept: "ingredients",
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
		drop(itemId) {
			if (itemId.type !== "bun") {
				dispatch({
					type: ADD_INGREDIENT,
					ingredient: itemId,
				});
			} else {
				dispatch({
					type: DECREASE_BUNS,
				});
				dispatch({
					type: ADD_BUN,
					buns: itemId,
				});
			}
			dispatch({
				type: INCREASE_INGREDIENT,
				id: itemId._id,
			});
		},
	});

	return (
		<div className={`${BurgerConstructorStyle.area} pt-25 pl-4`}>
			<div
				style={{ display: "flex", flexDirection: "column", gap: "16px" }}
				ref={dropTarget}
			>
				<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
					{burger.buns && <BunConstructor type="top" />}
					{!burger.buns && (
						<div className={BurgerConstructorStyle.empty_bun_top}></div>
					)}
				</div>
				{burger.listIngredients.length > 0 && (
					<div className={BurgerConstructorStyle.scroll_area}>
						{burger.listIngredients.map((tempElement, index) => {
							if (tempElement.type != "bun") {
								return (
									<ElementConstructor
										tempElement={tempElement}
										index={index}
										key={tempElement.uuid}
									></ElementConstructor>
								);
							}
						})}
					</div>
				)}
				{burger.listIngredients.length === 0 && (
					<div className={BurgerConstructorStyle.empty_ingredient}></div>
				)}

				<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
					{burger.buns && <BunConstructor type="bottom" />}
					{!burger.buns && (
						<div className={BurgerConstructorStyle.empty_bun_bottom}></div>
					)}
				</div>
			</div>

			<div className={`${BurgerConstructorStyle.order} mt-10 pr-6`}>
				<p className="text text_type_digits-medium mr-2">{burgerPrice}</p>
				<div className={BurgerConstructorStyle.icon}>
					<CurrencyIcon type="primary" className="ml-10" />
				</div>

				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={() => infoOrder()}
				>
					Оформить заказ
				</Button>
				{order.number != null && modal}
			</div>
		</div>
	);
}

export default BurgerConstructor;
