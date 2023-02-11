import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabIngredientsStyle from "./tab-ingredients.module.css";
import { useSelector } from "react-redux";

function TabIngredients() {
	const activeTab = useSelector((store) => store.tabs.activeTab);
	return (
		<div
			className={`${TabIngredientsStyle.tabs} mt-5 mb-8`}
		>
			<Tab className={TabIngredientsStyle.tab} value="one" active={activeTab === "one"}>
				Булки
			</Tab>
			<Tab value="two" active={activeTab === "two"}>
				Соусы
			</Tab>
			<Tab value="three" active={activeTab === "three"}>
				Начинки
			</Tab>
		</div>
	);
}

export default TabIngredients;
