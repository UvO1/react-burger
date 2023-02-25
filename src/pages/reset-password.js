import React from "react";
import AppHeader from "../components/app-header/app-header.js";
import LoginStyle from "./login.module.css";
import {PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { saveNewPassword, checkReponse, createUser
 } from "../utils/burger-api.js";
 import { useNavigate } from "react-router-dom";
 import ProfileStyle from "./profile.module.css";

export function ResetPasswordPage(){
    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePassword = e => {
        setValuePassword(e.target.value)
    }
    const [valueCode, setValueCode] = React.useState('')
    const inputRefCode = React.useRef(null)
    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login');
    }

    function handleSaveNewPassword(e){
        e.preventDefault();
		saveNewPassword(valuePassword, valueCode)
		.then(checkReponse)
		.then((data) => {
			if(data.success){
                localStorage.removeItem("resertPassword");
				navigate('/');
			}
		})
		.catch((e) =>{
		});
	}

    return(
        <>
            <AppHeader />
            <div className={LoginStyle.wrap}>
                <form className={LoginStyle.form_area} onSubmit={handleSaveNewPassword}>
                    <p className="text text_type_main-medium">Восстановление пароля</p>
                    <div className="mt-6">
                        <PasswordInput
                        onChange={onChangePassword}
                        value={valuePassword}
                        name={'password'}
                        extraClass="mb-2"
                        />
                    </div>
                    <div className="mt-6">
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            onChange={e => setValueCode(e.target.value)}
                            value={valueCode}
                            name={'code'}
                            error={false}
                            ref={inputRefCode}
                            errorText={'Ошибка'}
                            size={'default'}
                            extraClass="ml-1"
                            />
                    </div>
                    <div className="mt-6">
                        <input className={ProfileStyle.buttonActive} type="submit" value="Сохранить" />
                    </div>
                    <div className="mt-20">
                        <span className="text text_type_main-default text_color_inactive">
                        Вспомнили пароль?
                        </span>
                        <a className="ml-2" onClick={handleLogin} >Войти</a>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ResetPasswordPage;