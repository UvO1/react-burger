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
import { OrderInfoContext } from "../../utils/ingredients-context";
import { getOrder } from "../../utils/burger-api";

function BurgerConstructor() {
	const [isOpen, setOpen] = React.useState(false);
	const { ingredients } = React.useContext(IngredientsContext);
	const [orderInfo, setOrderInfo] = React.useState({
		nameOrder: "",
		numberOrder: null,
		successOrder: false,
		price: 0,
		listIngredients: [],
		buns: null,
	});
	const [state, setState] = React.useState({
		isLoading: false,
		isError: false,
		data: [],
	});

	React.useEffect(() => {
		let tempPrice = 0;
		let bunsBurger = null;

		ingredients.map((element) => {
			if (element.type === "bun") {
				if (bunsBurger === null) {
					tempPrice = tempPrice + element.price + element.price; //two buns in one burger
					bunsBurger = element;
				}
			} else {
				tempPrice = tempPrice + element.price;
			}
		});
		setOrderInfo({
			...orderInfo,
			listIngredients: ingredients,
			price: tempPrice,
			buns: bunsBurger,
		});
	}, [ingredients]);

	const checkReponse = (res) => {
		return res.ok
			? res.json()
			: res.json().then((err) => {
					Promise.reject(err);
					setState({ ...state, isLoading: false, hasError: false });
			  });
	};

	function handleOpenModal() {
		setOpen(true);
		const infoOrder = async () => {
			let fetchList = [];
			setState({
				...state,
				isLoading: true,
				hasError: false,
			});
			orderInfo.listIngredients.map((element) => {
				if (element.type != "bun") {
					fetchList.push(element._id);
				}
			});
			fetchList.push(orderInfo.buns._id); 
			fetchList.push(orderInfo.buns._id); //the same bun in one burger

			getOrder(fetchList)
				.then(checkReponse)
				.then((data) => {
					setOrderInfo({
						...orderInfo,
						nameOrder: data.name,
						numberOrder: data.order.number,
						successOrder: data.success,
					});
				})
				.catch((e) => setState({ ...state, isLoading: false, isError: true }));
		};
		infoOrder();
	}

	function handleCloseModal() {
		setOpen(false);
	}

	const modal = (
		<OrderInfoContext.Provider value={{ orderInfo, setOrderInfo }}>
			<Modal title="" onClosed={handleCloseModal}>
				<OrderDetails />
			</Modal>
		</OrderInfoContext.Provider>
	);

	return (
		<div className={`${BurgerConstructorStyle.area} pt-25 pl-4`}>
			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{orderInfo.buns && (
					<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
						<OrderInfoContext.Provider value={{ orderInfo, setOrderInfo }}>
							<BunConstructor type="top" />
						</OrderInfoContext.Provider>
					</div>
				)}
				<div className={BurgerConstructorStyle.scroll_area}>
					{orderInfo.listIngredients.map((tempElement) => {
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
				{orderInfo.buns && (
				<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
					<OrderInfoContext.Provider value={{ orderInfo, setOrderInfo }}>
						<BunConstructor type="bottom" />
					</OrderInfoContext.Provider>
				</div>
				)}
			</div>

			<div className={`${BurgerConstructorStyle.order} mt-10 pr-6`}>
				<p className="text text_type_digits-medium mr-2">{orderInfo.price}</p>
				<div className={BurgerConstructorStyle.icon}>
					<CurrencyIcon type="primary" className="ml-10" />
				</div>

				<Button
					htmlType="button"
					type="primary"
					size="large"
					extraClass="ml-10"
					onClick={handleOpenModal}
				>
					Оформить заказ
				</Button>
				{isOpen && modal}
			</div>
		</div>
	);
}

export default BurgerConstructor;
