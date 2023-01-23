import React from "react";
import BurgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.js";
import OrderDetails from "../order-details/order-details";
import BunConstructor from "../bun-constructor/bun-constructor";
import { IngredientsContext } from "../../utils/ingredients-context";
import { OrderContext } from "../../utils/ingredients-context";
import { BurgerContext } from "../../utils/ingredients-context";
import { getOrder } from "../../utils/burger-api";
import { checkReponse } from "../../utils/burger-api";

function BurgerConstructor() {
	const { ingredients } = React.useContext(IngredientsContext);

	const [order, setOrder] = React.useState({
		name: "",
		number: null,
		success: false,
	});

	const [state, setState] = React.useState({
		isLoading: false,
		isError: false,
		data: [],
	});

	const burgerPrice = React.useMemo(
		() => {
		let hasBun = false;
		const totalPrice = ingredients.reduce((price, element) => {
			if (element.type === "bun") {
					if (!hasBun) {
						price += element.price + element.price; //two buns in one burger
						hasBun = true;
					}
			}
			else {
					price += element.price;
			}
			return price;
		}, 0);
		return totalPrice;
	}, [ingredients]);

	const burger = React.useMemo(( ) => {
		const burgerObject = ingredients.reduce((bObj, element) => {
			if (element.type === "bun") {
				if (bObj.buns === null) {
					bObj.buns = element;
				}
			} 
			else{
				bObj.listIngredients.push(element);
			}
			return bObj;
		}, {buns: null, listIngredients: []});
		return burgerObject;
	}, [ingredients]
	)

	const infoOrder = async () => {
		let fetchList = [];
		setState({
			...state,
			isLoading: true,
			hasError: false,
		});
		burger.listIngredients.map((element) => {
			if (element.type != "bun") {
				fetchList.push(element._id);
			}
		});
		fetchList.push(burger.buns._id); 
		fetchList.push(burger.buns._id); //the same bun in one burger

		getOrder(fetchList)
			.then(checkReponse)
			.then((data) => {
				setOrder({
					name: data.name,
					number: data.order.number,
					success: data.success,
				});
				setState({ ...state, isLoading: false, hasError: false });
			})
			.catch((e) => setState({ ...state, isLoading: false, isError: true }));
	};			

	function handleCloseModal() {
		setOrder({
			name: "",
			number: null,
			success: false,
		});
	}

	const modal = (
			<OrderContext.Provider value={{order}}>
				<Modal title="" onClosed={handleCloseModal}>
					<OrderDetails />
				</Modal>
			</OrderContext.Provider>
	);

	return (
		<div className={`${BurgerConstructorStyle.area} pt-25 pl-4`}>
			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{burger.buns && (
					<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
						<BurgerContext.Provider value={{ burger }}>
							<BunConstructor type="top" />
						</BurgerContext.Provider>
					</div>
				)}
				<div className={BurgerConstructorStyle.scroll_area}>
					{burger.listIngredients.map((tempElement) => {
						if (tempElement.type != "bun") {
							return (
								<div
									className={BurgerConstructorStyle.element_block}
									key={tempElement._id}
								>
									<DragIcon type="primary" className="pr-2" />
									<div
										className={`ml-2 ${BurgerConstructorStyle.ingredient_block}`}
									>
										<ConstructorElement
											text={tempElement.name}
											price={tempElement.price}
											thumbnail={tempElement.image}
										/>
									</div>
								</div>
							);
						}
					})}
				</div>
				{burger.buns && (
				<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
					<BurgerContext.Provider value={{ burger }}>
						<BunConstructor type="bottom" />
					</BurgerContext.Provider>
				</div>
				)}
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
					onClick={infoOrder}
				>
					Оформить заказ
				</Button>
				{(order.number != null) && modal}
			</div>
		</div>
	);
}

export default BurgerConstructor;
