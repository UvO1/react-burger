import AppHeaderStyles from "./app-header.module.css";
import MenuItem from "../menu-item/menu-item.js";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_MENU } from "../../services/actions/profile.js";


function AppHeader() {
	let iconBurger = <BurgerIcon type="primary" />;
	let iconOrder = <ListIcon type="secondary" />;
	let iconProfile = <ProfileIcon type="secondary" />;
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleToProfile(){
		navigate('/profile');
		dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile"
        });
	}

	return (
		<header className={`${AppHeaderStyles.wrap}`}>
			<div className={`${AppHeaderStyles.header}`}>
				<div className={AppHeaderStyles.menuarea}>
					<MenuItem icon={iconBurger} menutext="Конструктор" active={true} />
					<MenuItem icon={iconOrder} menutext="Лента заказов" active={false} />
				</div>
				<div className={AppHeaderStyles.menuarea}>
					<Logo />
				</div>
				<div className={AppHeaderStyles.menuarea} onClick={handleToProfile}>
					<MenuItem
						icon={iconProfile}
						menutext="Личный кабинет"
						active={false}
					/>
				</div>
			</div>
		</header>
	);
}

export default AppHeader;
