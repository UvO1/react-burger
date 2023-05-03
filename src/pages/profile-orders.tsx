import React from "react";
import ProfileStyle from "./profile.module.css";
import { useSelector, useDispatch } from "../services/hooks";
import { useNavigate } from "react-router-dom";
import { CHANGE_MENU} from "../services/actions/profile";
import PreviewOrder from "../components/preview-order/preview-order";
import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED } from "../services/actions/ws";
import { IOrderWs, IMessages } from "../components/types";
import { logoutUserAction } from "../services/actions/authorization";

export interface IAutorizationUser{
    email: string;
    name: string;
    password: string;
}

function ProfileOrdersPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo: boolean | undefined = useSelector((store) => store.authorization.isAuthorized);

    const messages: IMessages = useSelector(store => store.ws.messagesUser)
    React.useEffect(() => {
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
        dispatch({
            type: WS_CONNECTION_START_USER,
        });
        return() => {
            dispatch({
                type: WS_CONNECTION_CLOSED,
            });
        };
	}, [dispatch]);

    React.useEffect(() => {
        if(!userInfo) navigate('/login', {replace: true});
    },[userInfo]);

    function handleMenuToProfile(){
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
        navigate('/profile', {replace: true});
    }

    function handleMenuToStory(){
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "orders",
        });
    }
    function handleExit(){
        const tempRefresh: string | null = localStorage.getItem("refreshToken");
        dispatch<any>(logoutUserAction(tempRefresh)); 
}

    return(        
    <>
            <div className={`ml-5 mt-30 ${ProfileStyle.wrap}`}>
                <div className={ProfileStyle.menu}>
                    <div className={ProfileStyle.element} onClick={handleMenuToProfile}>
                        <p className={`text text_type_main-medium text_color_inactive`} >Профиль</p>
                    </div>
                    <div className={ProfileStyle.element} onClick={handleMenuToStory}>
                        <p className={`text text_type_main-medium `}>История заказов</p>
                    </div>
                    <div className={ProfileStyle.element}>
                        <p className="text text_type_main-medium text_color_inactive" onClick={handleExit}>Выход</p>
                    </div>
                    <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <div>
                    <div className={`${ProfileStyle.scroll_area} ml-15`}>
                    {messages && messages.orders && messages.orders.map((message: IOrderWs, index) => {
                            return(
                                <PreviewOrder data={message} from='profile' key={index}/>
                            );
                        })}
                    </div>
                </div>

            </div>

    </>);
}
export default ProfileOrdersPage;