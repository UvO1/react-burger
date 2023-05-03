import React from "react";
import BurgerIngredientsStyle from "./burger-ingredients.module.css";
import CardIngredient from "../card-ingredient/card-ingredient";
import TabIngredients from "../tab-ingredients/tab-ingredients";
import { useDispatch, useSelector } from "../../services/hooks";
import { CHANGE_TAB } from "../../services/actions/tabs";
import { IIngredient } from "../types";

function BurgerIngredients() {
	const dispatch = useDispatch();
	const ingredients: Array<IIngredient> = useSelector((store) => store.ingredients.ingredients);

	const datas_bun: Array<IIngredient> = React.useMemo(
		() => ingredients.filter((ingredient: IIngredient) => ingredient.type === "bun"),
		[ingredients]
	);

	const datas_sauce: Array<IIngredient> = React.useMemo(
		() => ingredients.filter((ingredient: IIngredient) => ingredient.type === "sauce"),
		[ingredients]
	);

	const datas_main: Array<IIngredient> = React.useMemo(
		() => ingredients.filter((ingredient: IIngredient) => ingredient.type === "main"),
		[ingredients]
	);

	function handleScroll() {
		const scroll: HTMLElement | null = document.getElementById("scroll");
		const burger_offset: HTMLElement | null = document.getElementById("buns");
		const sauce_offset: HTMLElement | null = document.getElementById("sauce");
		const main_offset: HTMLElement | null = document.getElementById("main");
		let twoTab: number = 0;
		let threeTab: number = 0;
		if(sauce_offset && burger_offset){
			twoTab = (sauce_offset.offsetHeight - burger_offset.offsetHeight) / 2;
		}
		if(main_offset && sauce_offset && burger_offset){
			threeTab =
			(main_offset.offsetHeight - sauce_offset.offsetHeight) / 2 +
			(sauce_offset.offsetHeight - burger_offset.offsetHeight);
		}

		if(scroll){
			if (scroll.scrollTop >= twoTab && scroll.scrollTop < threeTab) {
				dispatch({
					type: CHANGE_TAB,
					activeTab: "two",
				});
			} else if (scroll.scrollTop >= threeTab) {
				dispatch({
					type: CHANGE_TAB,
					activeTab: "three",
				});
			} else if (scroll.scrollTop < twoTab) {
				dispatch({
					type: CHANGE_TAB,
					activeTab: "one",
				});
			}
		}
	}

	return (
		<div className={`${BurgerIngredientsStyle.area} pl-5`}>
			<p className="text text_type_main-large mt-10">Cоберите бургер</p>
			<TabIngredients />
			<div
				className={BurgerIngredientsStyle.scroll_area}
				onScroll={handleScroll}
				id="scroll"
			>
				<div
					id="buns"
					className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}
				>
					<p className="text text_type_main-medium mt-2 mb-6">Булки</p>
					<div className="pl-4 ">
						{" "}
						{datas_bun.map((tempIngr) => {
							return (
								<CardIngredient
									ingredient={tempIngr}
									key={tempIngr._id}
									data={tempIngr}
								/>
							);
						})}
					</div>
				</div>

				<div
					id="sauce"
					className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}
				>
					<p className="text text_type_main-medium mt-2 mb-6">Соусы</p>
					<div className="pl-4 " id="sauce">
						{" "}
						{datas_sauce.map((tempIngr) => {
							return (
								<CardIngredient
									ingredient={tempIngr}
									key={tempIngr._id}
									data={tempIngr}
								/>
							);
						})}
					</div>
				</div>

				<div
					id="main"
					className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}
				>
					<p className="text text_type_main-medium mt-2 mb-6">Начинки</p>
					<div className="pl-4 " id="main">
						{" "}
						{datas_main.map((tempIngr) => {
							return (
								<CardIngredient
									ingredient={tempIngr}
									key={tempIngr._id}
									data={tempIngr}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BurgerIngredients;
