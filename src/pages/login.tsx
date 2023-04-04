import React from "react";
import AppHeader from "../components/app-header/app-header";
import LoginStyle from "./login.module.css";
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../services/hooks";
import { loginUser } from "../utils/burger-api";
import { LOGIN_USER_SUCCESS } from "../services/actions/authorization";
import ProfileStyle from "./profile.module.css";

export function LoginPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valueEmail, setValueEmail] = React.useState<string>('')
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueEmail(e.target.value)
    }
    const [valuePassword, setValuePassword] = React.useState<string>('')
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValuePassword(e.target.value)
    }
    function handleRegister(){
        navigate('/register');
    }
    function handleForgot(){
        navigate('/forgot-password');
    }
    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        loginUser(valueEmail, valuePassword)
        .then((data: any) => {
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

        })
        .catch(() => {
            return null;
        });
    };
    
    return(
        <>
            <div className={LoginStyle.wrap}>
                <form className={LoginStyle.form_area} onSubmit={handleLogin}>
                    <p className="text text_type_main-medium">Вход</p>
                        <EmailInput  
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
                        <input className={ProfileStyle.buttonActive} type="submit" value="Войти" />
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

                </form>
            </div>
        </>
    );
}

export default LoginPage;