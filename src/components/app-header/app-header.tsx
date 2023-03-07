import AppHeaderStyles from "./app-header.module.css";
import MenuItem from "../menu-item/menu-item";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_MENU } from "../../services/actions/profile";


function AppHeader() {
	interface IActiveMenu{
		isActiveMenu: string;
	}
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const activeMenu:IActiveMenu = useSelector((store: any) => store.profile);
	function handleToProfile(){
		dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
		navigate('/profile');
	}
	function handleToOrders(){
		dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "orders",
        });
	}
	function handleToConstructor(){
		dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "constructor",
        });
		navigate('/');
	}
	return (
		<header className={`${AppHeaderStyles.wrap}`}>
			<div className={`${AppHeaderStyles.header}`}>
				<div className={AppHeaderStyles.menuarea} onClick={handleToConstructor}>
						<MenuItem active={activeMenu.isActiveMenu === 'constructor' ? true : false}  icon={<BurgerIcon type={activeMenu.isActiveMenu === 'constructor' ? "primary" : "secondary"} />}   menutext="Конструктор" />
						</div>
					<div className={AppHeaderStyles.menuarea} onClick={handleToOrders}>
						<MenuItem active={activeMenu.isActiveMenu === 'orders' ? true : false} icon={<ListIcon type={activeMenu.isActiveMenu === 'orders' ? "primary" : "secondary"} />} menutext="Лента заказов" />
					</div>
				
				<div className={AppHeaderStyles.menuarea}>
					<Logo />
				</div>
				<div className={AppHeaderStyles.menuarea} onClick={handleToProfile}>
					<MenuItem active={activeMenu.isActiveMenu === 'profile' ? true : false} icon={<ProfileIcon type={activeMenu.isActiveMenu === 'profile' ? "primary" : "secondary"} />} menutext="Личный кабинет" />
				</div>
			</div>
		</header>
	);
}

export default AppHeader;
