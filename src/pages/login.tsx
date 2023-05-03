import React, { useEffect } from "react";
import LoginStyle from "./login.module.css";
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import ProfileStyle from "./profile.module.css";
import { loginUserAction } from "../services/actions/authorization";

export function LoginPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tempUser = useSelector((store) => store.authorization.isAuthorized);
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
    useEffect(()=>{
        if(tempUser) navigate('/');
        
    },[tempUser]);

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        dispatch<any>(loginUserAction(valueEmail, valuePassword));       
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
                        id="isemail"
                        />

                        <PasswordInput
                        onChange={onChangePassword}
                        value={valuePassword}
                        name={'password'}
                        extraClass="mt-6"
                        />

                    <div className="mt-6">
                        <input className={ProfileStyle.buttonActive} type="submit" value="Войти" data-testid="islogin" />
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