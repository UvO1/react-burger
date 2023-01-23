import React from "react";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import CardIngredient from "../card-ingredient/card-ingredient";
import PropTypes from "prop-types";
import messagePropTypes from "../../utils/prop-types";
import TabIngredients from "../tab-ingredients/tab-ingredients";

function BurgerIngredients(props) {
	const datas_bun = React.useMemo( 
		() => props.datas.filter((ingredient) => ingredient.type === "bun"
	), [props.datas]);

	const datas_sauce = React.useMemo( 
		() => props.datas.filter(
		(ingredient) => ingredient.type === "sauce"
	), [props.datas]);

	const datas_main = React.useMemo(
		() => props.datas.filter(
		(ingredient) => ingredient.type === "main"
	), [props.datas]);

	return (
		<div className={`${BurgerIngredientsStyle.area} pl-5`}>
			<p className="text text_type_main-large mt-10">Cоберите бургер</p>
			<TabIngredients />
			<div className={BurgerIngredientsStyle.scroll_area}>
				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Булки</p>
					{datas_bun &&
					(<div className="pl-4 ">
						{" "}
						
						{datas_bun.map((tempIngr) => {
							return (
								<CardIngredient ingredient={tempIngr} key={tempIngr._id} />
							);
						})}
					</div>)
					}
				</div>

				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Соусы</p>
					<div className="pl-4 ">
						{" "}
						{datas_sauce.map((tempIngr) => {
							return (
								<CardIngredient ingredient={tempIngr} key={tempIngr._id} />
							);
						})}
					</div>
				</div>

				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Начинки</p>
					<div className="pl-4 ">
						{" "}
						{datas_main.map((tempIngr) => {
							return (
								<CardIngredient ingredient={tempIngr} key={tempIngr._id} />
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

BurgerIngredients.propTypes = {
	datas: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
