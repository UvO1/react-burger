import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderInfoContext } from "../../utils/ingredients-context";
import PropTypes from "prop-types";

function BunConstructor(props) {
	const { orderInfo, setOrderInfo } = React.useContext(OrderInfoContext);
	let nameBun = orderInfo.buns.name;

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
			price={orderInfo.buns.price}
			thumbnail={orderInfo.buns.image}
		/>
	);
}

export default BunConstructor;

BunConstructor.propTypes = {
	type: PropTypes.string.isRequired,
};
