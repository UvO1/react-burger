import React from "react";
import CardIngredientStyle from "./card-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal.js";
import messagePropTypes from "../../utils/prop-types";

function CardIngredient(props) {
	const [isOpen, setOpen] = React.useState(false);
	const modal = (
		<Modal title="Детали ингредиента" onClosed={handleCloseModal}>
			<IngredientDetails ingredient={props.ingredient} />
		</Modal>
	);
	function handleOpenModal() {
		setOpen(true);
	}

	function handleCloseModal() {
		setOpen(false);
	}

	return (
		<>
			{isOpen && modal}
			<div
				className={`${CardIngredientStyle.cardwrap} mb-8`}
				onClick={handleOpenModal}
			>
				<Counter count={1} size="default" extraClass="m-1" />
				<img
					src={props.ingredient.image}
					className={CardIngredientStyle.ingredient_image}
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
