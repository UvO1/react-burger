import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabIngredientsStyle from "./tab-ingredients.module.css";

function TabIngredients() {
	const [current, setCurrent] = React.useState("one");
	return (
		<div
			style={{ display: "flex" }}
			className={`${TabIngredientsStyle.tabs} mt-5 mb-8`}
		>
			<Tab
				style="min-width: 33%"
				value="one"
				active={current === "one"}
				onClick={setCurrent}
			>
				Булки
			</Tab>
			<Tab value="two" active={current === "two"} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="three" active={current === "three"} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);
}

export default TabIngredients;