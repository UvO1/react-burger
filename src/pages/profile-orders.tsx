import AppHeader from "../components/app-header/app-header";
import React, { useEffect, useState } from "react";
import ProfileStyle from "./profile.module.css";
import { useSelector, useDispatch } from "../services/hooks";
import { useNavigate } from "react-router-dom";
import { CHANGE_MENU} from "../services/actions/profile";
import { deleteCookie, getCookie } from "../utils/burger-api";
import { logoutUser, checkReponse, saveUser, getUser } from "../utils/burger-api";
import { LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILED, SAVE_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST } from "../services/actions/authorization";
import PreviewOrder from "../components/preview-order/preview-order";
import { CHANGE_TAB } from "../services/actions/tabs";
import { IMessages } from "../components/feed/feed";
import { getIngredientsAction } from "../services/actions";
import { WS_CONNECTION_START_USER, WS_CONNECTION_CLOSED } from "../services/actions/ws";
import { IOrderWs } from "../components/feed/feed";

export interface IAutorizationUser{
    email: string;
    name: string;
    password: string;
}

function ProfileOrdersPage(){
    const isActiveMenu: 'orders' | 'profile' | 'constructor' = useSelector((store) => store.profile.isActiveMenu);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo: IAutorizationUser = useSelector((store) => store.authorization.user);

    const messages: IMessages = useSelector(store => store.ws.messagesUser)
    React.useEffect(() => {
		dispatch<any>(getIngredientsAction());
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
        const tempAccess = getCookie("accessToken");

        dispatch({
            type: WS_CONNECTION_START_USER,
        });
	}, [dispatch]);

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
        dispatch({
            type: LOGOUT_USER_REQUEST,
        });
        
        const tempRefresh: string | null = localStorage.getItem("refreshToken");
            logoutUser(tempRefresh)
            .then(checkReponse)
            .then((data: any) => {
                if(data.success){
                    dispatch({
                        type: LOGOUT_USER_SUCCESS
                    });
                    localStorage.removeItem("refreshToken");
                    deleteCookie("accessToken");
                    navigate('/login', {replace: true});
                }
                else{
                    dispatch({
                        type: LOGOUT_USER_FAILED,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                });
            });      
}

    return(        
    <>
        <AppHeader />
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