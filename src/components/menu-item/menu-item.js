import MenuItemStyles from "./menu-item.module.css";
import PropTypes from "prop-types";
function MenuItem(props) {

	let textcolor = "text_color_inactive";
	if (props.active) textcolor = "";

	return (
		<div className={`${MenuItemStyles.menuitem} pl-5 pt-4 pr-5 pb-4`}>
			{props.icon}
			<span
				className={`${MenuItemStyles.menutext} text text_type_main-default pl-2 ${textcolor}`}
			>
				{props.menutext}
			</span>
		</div>
	);
}

MenuItem.propTypes = {
	active: PropTypes.bool.isRequired,
	menutext: PropTypes.string.isRequired,
	icon: PropTypes.object.isRequired,
};

export default MenuItem;
