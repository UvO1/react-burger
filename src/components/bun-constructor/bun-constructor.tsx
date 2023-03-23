import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { IIngredient } from "../app/app";

type TBunConstructor = {
	type: "top" | "bottom";
};

function BunConstructor({type}: TBunConstructor) {
	const burgerBun: IIngredient | null = useSelector((store) => store.burger.buns);
	if(burgerBun){
		let nameBun: string = burgerBun.name;

		if (type === "top") {
			nameBun = nameBun + " (верх)";
		} else if (type === "bottom") {
			nameBun = nameBun + " (низ)";
		}
		return (
			<ConstructorElement
				type={type}
				isLocked={true}
				text={nameBun}
				price={burgerBun.price}
				thumbnail={burgerBun.image}
			/>
		);
	}
	return null;

}

export default BunConstructor;
