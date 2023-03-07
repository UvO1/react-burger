import React, { useCallback, useEffect, useState } from "react";
import AppHeader from "../components/app-header/app-header";
import {EmailInput, PasswordInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyle from "./profile.module.css";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_MENU} from "../services/actions/profile.js";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "../utils/burger-api";
import { logoutUser, checkReponse, saveUser, getUser } from "../utils/burger-api";
import { LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_REQUEST, SAVE_USER_SUCCESS, SAVE_USER_FAILED, SAVE_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED, GET_USER_REQUEST } from "../services/actions/authorization.js";

interface IAutorizationUser{
    email: string;
    name: string;
    password: string;
}

export function ProfilePage(){
    const isActiveMenu: "orders" | "profile" = useSelector((store: any) => store.profile.isActiveMenu);
    const userInfo: IAutorizationUser = useSelector((store: any) => store.authorization.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [valueName, setValueName] = React.useState<string>('')
    const inputRefName = React.useRef<HTMLInputElement>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [valuePassword, setValuePassword] = React.useState<string>('')
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValuePassword(e.target.value)
      setIsEdit(true);
    }

    const [valueEmail, setValueEmail] = React.useState('')
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setValueEmail(e.target.value);
        setIsEdit(true);
    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueName(e.target.value);
        setIsEdit(true);
    }
    function handleMenuToProfile(){
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
    }

    function handleMenuToStory(){
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "orders",
        });
    }
    useEffect(() => {
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
        dispatch({
            type: GET_USER_REQUEST,
        });
            const tempAccessToken: string | undefined = getCookie("accessToken");
            if(tempAccessToken){
                getUser(tempAccessToken)
                .then((data: any) => {
                    if(data.success){
                        dispatch({
                            type: GET_USER_SUCCESS,
                            user: {
                                name: data.user.name,
                                email: data.user.email,
                            },
                            accessToken: getCookie("accessToken"),
                            refreshToken: localStorage.getItem("refreshToken"),
                        });
                        setValueEmail(data.user.email);
                        setValueName(data.user.name);
                    }
                    else{
                        dispatch({
                            type: GET_USER_FAILED,
                        });
                    }
                })
                .catch(() => {
                    dispatch({
                        type: GET_USER_FAILED,
                    });
                });
            }
            
        setValueEmail(userInfo.email);
        setValueName(userInfo.name);
        setValuePassword(userInfo.password);
        
    }, []);

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
    function handleCancelSave(){
        if(isEdit){
            setValueEmail(userInfo.email);
            setValueName(userInfo.name);
            setValuePassword(userInfo.password);
            setIsEdit(false);
        }
    }
    function handleSaveUser(e: React.FormEvent){
        e.preventDefault();
        let newPassword: string = valuePassword;
        if(isEdit){
            if(valuePassword === ""){
                newPassword = userInfo.password;
            }
            dispatch({
                type: SAVE_USER_REQUEST,
            });
            const tempAccessToken: string | undefined = getCookie("accessToken");
            if(tempAccessToken){
                saveUser(tempAccessToken, valueEmail, valuePassword, valueName)
                .then(checkReponse)
                .then((data: any) => {
                    if(data.success){
                        dispatch({
                            type: SAVE_USER_SUCCESS,
                            user: {
                                email: data.user.email,
                                name: data.user.name,
                                password: newPassword,
                            },
                            accessToken: getCookie("accessToken"),
                            refreshToken: localStorage.getItem("refreshToken"),
                        });
                    }
                    else{
                        dispatch({
                            type: SAVE_USER_FAILED,
                        });
                    }
                })
                .catch(() => {
                    dispatch({
                        type: SAVE_USER_FAILED,
                    });
                });
            }
            
            setIsEdit(false);
        }
    }

    return(
        <>
        <AppHeader />
            <div className={`ml-5 mt-30 ${ProfileStyle.wrap}`}>
                <div className={ProfileStyle.menu}>
                    <div className={ProfileStyle.element} onClick={handleMenuToProfile}>
                        <p className={`text text_type_main-medium ${(isActiveMenu !== "profile") && ("text_color_inactive")}`} >Профиль</p>
                    </div>
                    <div className={ProfileStyle.element} onClick={handleMenuToStory}>
                        <p className={`text text_type_main-medium ${(isActiveMenu !== "orders") && ("text_color_inactive")}`}>История заказов</p>
                    </div>
                    <div className={ProfileStyle.element}>
                        <p className="text text_type_main-medium text_color_inactive" onClick={handleExit}>Выход</p>
                    </div>
                    <p className="text text_type_main-default text_color_inactive mt-20">
                    В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <form className={`ml-15 ${ProfileStyle.form}`}  onSubmit={handleSaveUser}>
                    <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChangeName}
                            value={valueName}
                            name={'name'}
                            error={false}
                            ref={inputRefName}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={'EditIcon'}
                        />

                        <EmailInput
                        placeholder={'Логин'}
                        onChange={onChangeEmail}
                        value={valueEmail}
                        name={'email'}
                        isIcon={true}
                        extraClass="mt-6"/>

                        <PasswordInput
                        onChange={onChangePassword}
                        value={valuePassword}
                        name={'password'}
                        extraClass="mt-6"
                        icon="EditIcon"
                        />

                    <div className={`mt-6 ${ProfileStyle.button_area}`}>
                        <p className={`text text_type_main-default mr-7 ${!isEdit ? `text_color_inactive ${ProfileStyle.cancel_inactive}` : `${ProfileStyle.cancel}`}`} onClick={handleCancelSave}>
                        Отмена
                        </p>
                        {/*<Button htmlType="button" size="medium" className={ !isEdit ? ProfileStyle.buttonDiactive : ProfileStyle.buttonActive} extraClass={ProfileStyle.button_save} onClick = {handleSaveUser}>
                        Сохранить
                        </Button>/*/}
						<input className={!isEdit ? ProfileStyle.buttonDiactive : ProfileStyle.buttonActive} type="submit" value="Cохранить" />
                    </div>
                </form>
            </div>
        </>
    );
}


export default ProfilePage;