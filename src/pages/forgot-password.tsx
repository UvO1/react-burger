import React from "react";
import AppHeader from "../components/app-header/app-header";
import LoginStyle from "./login.module.css";
import {
	EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import {checkReponse, resetPassword} from "../utils/burger-api"
import { useNavigate } from "react-router-dom";
import ProfileStyle from "./profile.module.css";

export function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [valueEmail, setValueEmail] = React.useState<string>("");
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueEmail(e.target.value);
	};
	function handleReset(e: React.FormEvent){
        e.preventDefault();
		resetPassword(valueEmail)
		.then(checkReponse)
		.then((data: any) => {
			if(data.success){
				localStorage.setItem("resertPassword", "");
				navigate('/reset-password');
			}
		})
		.catch(() =>{
			return null;
		});
	}

	function handleLogin(){
        navigate('/login');
    }

	return (
		<>
			<div className={LoginStyle.wrap}>
				<form className={LoginStyle.form_area} onSubmit={handleReset}>
					<p className="text text_type_main-medium">Восстановление пароля</p>

					<EmailInput
						placeholder="Укажите e-mail"
						onChange={onChangeEmail}
						value={valueEmail}
						name={"email"}
						isIcon={false}
						extraClass="mt-6"
					/>

					<div className="mt-6">
						<input className={ProfileStyle.buttonActive} type="submit" value="Восстановить" />
					</div>
					<div className="mt-20">
						<span className="text text_type_main-default text_color_inactive">
							Вспомнили пароль?
						</span>
						<a className="ml-2" onClick={handleLogin}>
							Войти
						</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default ForgotPasswordPage;
