import React, { useEffect, useState } from "react";
import {EmailInput, PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyle from "./profile.module.css";
import { useSelector, useDispatch } from "../services/hooks";
import { CHANGE_MENU} from "../services/actions/profile";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../utils/burger-api";
import { saveUserAction, getUserAction } from "../services/actions/authorization";
import { logoutUserAction } from "../services/actions/authorization";

export interface IAutorizationUser{
    email: string;
    name: string;
    password: string;
}

export function ProfilePage(){
    const isActiveMenu: 'orders' | 'profile' | 'constructor' = useSelector((store) => store.profile.isActiveMenu);
    const userInfo: IAutorizationUser = useSelector((store) => store.authorization.user);
    const statusAuthorize = useSelector((store) => store.authorization.isAuthorized);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [valueName, setValueName] = React.useState<string>('')
    const inputRefName = React.useRef<HTMLInputElement>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [valuePassword, setValuePassword] = React.useState<string>('');
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
        navigate('/profile/orders', {replace: true});
    }
    useEffect(()=>{
        if(statusAuthorize === false) navigate('/login', {replace: true});
        else if(statusAuthorize === true) {
            setValueEmail(userInfo.email);
            setValueName(userInfo.name);
            setValuePassword(userInfo.password);
        }
    }, [statusAuthorize]);

    useEffect(() => {
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "profile",
        });
       const tempAccessToken: string | undefined  = getCookie("accessToken");
        dispatch<any>(getUserAction(tempAccessToken));    
        setValueEmail(userInfo.email);
        setValueName(userInfo.name);
        setValuePassword(userInfo.password);
    }, []);

    function handleExit(){
        const tempRefresh: string | null = localStorage.getItem("refreshToken");
        dispatch<any>(logoutUserAction(tempRefresh)); 
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
            const tempAccessToken: string | undefined = getCookie("accessToken");
            dispatch<any>(saveUserAction(tempAccessToken, valueEmail, valuePassword, valueName, newPassword));
            setIsEdit(false);
        }
    }

    return(
        <>
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
                        value={!valuePassword ? "" : valuePassword}
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