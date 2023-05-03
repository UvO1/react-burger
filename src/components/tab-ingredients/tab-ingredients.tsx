import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import TabIngredientsStyle from "./tab-ingredients.module.css";
import { useSelector, useDispatch } from "../../services/hooks";
import { CHANGE_TAB } from "../../services/actions/tabs";

function TabIngredients() {
	const activeTab: "one" | "two" | "three" = useSelector((store) => store.tabs.activeTab);
	const dispatch = useDispatch();
	function handleOnClick(active: "one" | "two" | "three"){
		dispatch({
			type: CHANGE_TAB,
			activeTab: active
		});
		const burger_offset: HTMLElement | null = document.getElementById("buns");
		const sauce_offset: HTMLElement | null = document.getElementById("sauce");
		const main_offset: HTMLElement | null = document.getElementById("main");
		if(active === "one"){
			document.getElementById('scroll')?.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
		if((active === "two")&& sauce_offset && burger_offset){
			document.getElementById('scroll')?.scrollTo({
				top: (sauce_offset.offsetHeight - burger_offset.offsetHeight),
				behavior: "smooth"
			});
		}
		if((active === "three") && main_offset && sauce_offset && burger_offset){
			document.getElementById('scroll')?.scrollTo({
				top: (main_offset.offsetHeight - sauce_offset.offsetHeight)/1.3 +
				(sauce_offset.offsetHeight - burger_offset.offsetHeight),
				behavior: "smooth"
			});
		}
		return null;
	}
	return (
		<div
			className={`${TabIngredientsStyle.tabs} mt-5 mb-8`}
		>
			<Tab value="one" active={activeTab === "one"} onClick={() => handleOnClick("one")}>
				Булки
			</Tab>
			<Tab value="two" active={activeTab === "two"} onClick={() => handleOnClick("two")}>
				Соусы
			</Tab>
			<Tab value="three" active={activeTab === "three"} onClick={() => handleOnClick("three")}>
				Начинки
			</Tab>
		</div>
	);
}

export default TabIngredients;
