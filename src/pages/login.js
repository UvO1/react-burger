import React, { useEffect } from "react";
import AppHeader from "../components/app-header/app-header.js";
import LoginStyle from "./login.module.css";
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { loginUserAction } from "../services/actions/authorization.js";
import { loginUser } from "../utils/burger-api.js";
import { LOGIN_USER_SUCCESS } from "../services/actions/authorization.js";

export function LoginPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valueEmail, setValueEmail] = React.useState('')
    const onChangeEmail = e => {
        setValueEmail(e.target.value)
    }
    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePassword = e => {
      setValuePassword(e.target.value)
    }
    function handleRegister(){
        navigate('/register');
    }
    function handleForgot(){
        navigate('/forgot-password');
    }
    function handleLogin() {
        loginUser(valueEmail, valuePassword)
        .then((data) => {
            if(data.success){
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: {
                        name: data.user.name,
                        email: data.user.email,
                        password: valuePassword,
                    }
                });
                navigate('/');

            }

        });
    };
    
    return(
        <>
            <AppHeader />
            <div className={LoginStyle.wrap}>
                <div className={LoginStyle.form_area}>
                    <p className="text text_type_main-medium">Вход</p>
                        <EmailInput  сlass="mt-6"
                        onChange={onChangeEmail}
                        value={valueEmail}
                        name={'email'}
                        isIcon={false}
                        extraClass="mt-6"
                        />

                        <PasswordInput
                        onChange={onChangePassword}
                        value={valuePassword}
                        name={'password'}
                        extraClass="mt-6"
                        />

                    <div className="mt-6">
                        <Button htmlType="button" type="primary" size="medium" onClick={handleLogin}>Войти</Button>
                    </div>
                    <div className="mt-20">
                        <span className="text text_type_main-default text_color_inactive">
                        Вы — новый пользователь?
                        </span>
                        <a className="ml-2" onClick={handleRegister}>Зарегистрироваться</a>
                    </div>
                    <div className="mt-4">
                        <span className="text text_type_main-default text_color_inactive">
                        Забыли пароль?
                        </span>
                        <a className="ml-2" onClick={handleForgot}>Восстановить пароль</a>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LoginPage;