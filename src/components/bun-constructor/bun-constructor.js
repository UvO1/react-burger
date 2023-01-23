import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerContext } from "../../utils/ingredients-context";
import PropTypes from "prop-types";

function BunConstructor(props) {
    const { burger } = React.useContext(BurgerContext); 
	let nameBun = burger.buns.name;

	if (props.type === "top") {
		nameBun = nameBun + " (верх)";
	} 
    else if (props.type === "bottom") {
		nameBun = nameBun + " (низ)";
	}
	return (
		<ConstructorElement
			type={props.type}
			isLocked={true}
			text={nameBun}
			price={burger.buns.price}
			thumbnail={burger.buns.image}
		/>
	);
}

export default BunConstructor;

BunConstructor.propTypes = {
	type: PropTypes.string.isRequired,
};
