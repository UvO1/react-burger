import CardIngredientStyle from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrag } from "react-dnd";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/modal";
import { VIEW_INGREDIENT_DETAILS, HIDE_INGREDIENT_DETAILS } from "../../services/actions/card";
import {ReactNode} from 'react';
import { IIngredient } from "../app/app";

interface ICardIngredient{
	data: IIngredient;
	ingredient: IIngredient;
}

function CardIngredient(props: ICardIngredient) {
	const dispatch = useDispatch();
	const isOpenModal: boolean = useSelector((store) => store.modal.isOpen);
	const ingredientOpen: IIngredient | null = useSelector((store) => store.card.ingredient);
	const modal: ReactNode = (
		<Modal title="Детали ингредиента" onClosed={handleCloseModal}>
			<IngredientDetails />
		</Modal>
	);
	const [{ opacity }, dragRef] = useDrag({
		type: "ingredients",
		item: props.data,
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	function handleOpenModal() {
		window.history.replaceState(null, "", "/#/ingredients/" + props.ingredient._id);
		dispatch({
			type: OPEN_MODAL,
		});
		dispatch({
			type: VIEW_INGREDIENT_DETAILS,
			ingredient: props.ingredient,
		});
	}

	function handleCloseModal() {
		window.history.replaceState(null, "", "/");
		dispatch({
			type: CLOSE_MODAL,
		});
		dispatch({
			type: HIDE_INGREDIENT_DETAILS,
		});
	}

	return (
		<>
			{isOpenModal  && (ingredientOpen) && props.ingredient._id === ingredientOpen._id && modal}
			<div
				className={`${CardIngredientStyle.cardwrap} mb-8`}
				onClick={handleOpenModal}
				draggable
				ref={dragRef}
				style={{ opacity }}
				data-testid={"card"}
			>
				<Counter
					count={props.ingredient.count}
					size="default"
					extraClass="m-1"
				/>
				<img
					src={props.ingredient.image}
					className={CardIngredientStyle.ingredient_image}
					alt = {props.ingredient.name}
				/>
				<div className={`${CardIngredientStyle.price} mt-1 mb-1`}>
					<span className="text text_type_digits-default mr-2">
						{props.ingredient.price}
					</span>
					<CurrencyIcon type="primary" />
				</div>
				<p
					className={`${CardIngredientStyle.name} text text_type_main-default`} data-testid={"cardname"}
				>
					{props.ingredient.name}
				</p>
			</div>
		</>
	);
}

export default CardIngredient;
