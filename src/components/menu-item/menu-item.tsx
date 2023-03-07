import MenuItemStyles from "./menu-item.module.css";
import {ReactNode} from 'react';

type TMenuItem = {
	active: boolean;
	menutext: string;
	icon: ReactNode;
};

function MenuItem(props: TMenuItem) {
	let textcolor: string = "text_color_inactive";
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


export default MenuItem;
