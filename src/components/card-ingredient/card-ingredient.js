import CardIngredientStyle from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal.js";
import messagePropTypes from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/modal";
import { VIEW_INGREDIENT_DETAILS, HIDE_INGREDIENT_DETAILS } from "../../services/actions/card";

function CardIngredient(props) {
	const dispatch = useDispatch();
	const isOpenModal = useSelector((store) => store.modal.isOpen);
	const ingredientOpen = useSelector((store) => store.card.ingredient);
	const modal = (
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
		dispatch({
			type: OPEN_MODAL,
		});
		dispatch({
			type: VIEW_INGREDIENT_DETAILS,
			ingredient: props.ingredient,
		});
	}

	function handleCloseModal() {
		dispatch({
			type: CLOSE_MODAL,
		});
		dispatch({
			type: HIDE_INGREDIENT_DETAILS,
		});
	}

	return (
		<>
			{isOpenModal && props.ingredient._id === ingredientOpen._id && modal}
			<div
				className={`${CardIngredientStyle.cardwrap} mb-8`}
				onClick={handleOpenModal}
				draggable
				ref={dragRef}
				style={{ opacity }}
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
					className={`${CardIngredientStyle.name} text text_type_main-default`}
				>
					{props.ingredient.name}
				</p>
			</div>
		</>
	);
}

CardIngredient.propTypes = {
	ingredient: messagePropTypes.isRequired,
};

export default CardIngredient;
