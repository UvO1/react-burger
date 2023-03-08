import React from "react";
import AppHeader from "../components/app-header/app-header";
import LoginStyle from "./login.module.css";
import {PasswordInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import { saveNewPassword, checkReponse
 } from "../utils/burger-api";
 import { useNavigate } from "react-router-dom";
 import ProfileStyle from "./profile.module.css";

export function ResetPasswordPage(){
    const [valuePassword, setValuePassword] = React.useState<string>('')
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValuePassword(e.target.value)
    }
    const [valueCode, setValueCode] = React.useState<string>('');
    const inputRefCode = React.useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function handleLogin(){
        navigate('/login');
    }

    function handleSaveNewPassword(e: React.FormEvent){
        e.preventDefault();
		saveNewPassword(valuePassword, valueCode)
		.then(checkReponse)
		.then((data: any) => {
			if(data.success){
                localStorage.removeItem("resertPassword");
				navigate('/');
			}
		})
		.catch(() =>{
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