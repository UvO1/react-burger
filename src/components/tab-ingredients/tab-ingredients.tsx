import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabIngredientsStyle from "./tab-ingredients.module.css";
import { useSelector } from "react-redux";

function TabIngredients() {
	const activeTab: "one" | "two" | "three" = useSelector((store: any) => store.tabs.activeTab);
	function handleOnClick(){
		return null;
	}
	return (
		<div
			className={`${TabIngredientsStyle.tabs} mt-5 mb-8`}
		>
			<Tab value="one" active={activeTab === "one"} onClick={handleOnClick}>
				Булки
			</Tab>
			<Tab value="two" active={activeTab === "two"} onClick={handleOnClick}>
				Соусы
			</Tab>
			<Tab value="three" active={activeTab === "three"} onClick={handleOnClick}>
				Начинки
			</Tab>
		</div>
	);
}

export default TabIngredients;
