import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function BunConstructor(props) {
	const burgerBun = useSelector((store) => store.burger.buns);
	let nameBun = burgerBun.name;

	if (props.type === "top") {
		nameBun = nameBun + " (верх)";
	} else if (props.type === "bottom") {
		nameBun = nameBun + " (низ)";
	}
	return (
		<ConstructorElement
			type={props.type}
			isLocked={true}
			text={nameBun}
			price={burgerBun.price}
			thumbnail={burgerBun.image}
		/>
	);
}

export default BunConstructor;

BunConstructor.propTypes = {
	type: PropTypes.string.isRequired,
};
