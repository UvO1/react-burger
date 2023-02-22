import React from "react";
import AppHeader from "../components/app-header/app-header.js";
import LoginStyle from "./login.module.css";
import {
	EmailInput,
	Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {checkReponse, resetPassword} from "../utils/burger-api"
import { useNavigate } from "react-router-dom";

export function ForgotPasswordPage() {
	const navigate = useNavigate();
	const [valueEmail, setValueEmail] = React.useState("");
	const onChangeEmail = (e) => {
		setValueEmail(e.target.value);
	};
	function handleReset(){
		resetPassword(valueEmail)
		.then(checkReponse)
		.then((data) => {
			if(data.success){
				localStorage.setItem("resertPassword", true);
				navigate('/reset-password');
			}
		})
		.catch((e) =>{
		});
	}

	function handleLogin(){
        navigate('/login');
    }

	return (
		<>
			<AppHeader />
			<div className={LoginStyle.wrap}>
				<div className={LoginStyle.form_area}>
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
						<Button htmlType="button" type="primary" size="medium" onClick={handleReset}>
							Восстановить
						</Button>
					</div>
					<div className="mt-20">
						<span className="text text_type_main-default text_color_inactive">
							Вспомнили пароль?
						</span>
						<a className="ml-2" onClick={handleLogin}>
							Войти
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default ForgotPasswordPage;
