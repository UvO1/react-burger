import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

type TBunConstructor = {
	type: "top" | "bottom";
};

export interface IBurgerBun{
	_id: string;
	name: string;
	type: string;
	price: number;
	image: string;
}

function BunConstructor({type}: TBunConstructor) {
	const burgerBun: IBurgerBun = useSelector((store: any) => store.burger.buns);
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

export default BunConstructor;
