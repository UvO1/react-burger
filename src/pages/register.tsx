import React from "react";
import AppHeader from "../components/app-header/app-header";
import LoginStyle from "./login.module.css";
import { useNavigate} from "react-router-dom";
import {
	EmailInput,
	PasswordInput,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch} from "react-redux";
import { createUser } from "../utils/burger-api";
import { CREATE_USER_FAILED, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from "../services/actions/authorization.js";
import { setCookie } from "../utils/burger-api";
import { checkReponse } from "../utils/burger-api";
import ProfileStyle from "./profile.module.css";

export function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [valueName, setValueName] = React.useState<string>("");
	const inputRefName = React.useRef<HTMLInputElement>(null);

	const [valueEmail, setValueEmail] = React.useState<string>("");
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueEmail(e.target.value);
	};
	const [valuePassword, setValuePassword] = React.useState<string>("");
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValuePassword(e.target.value);
	};

	function handleEnter(){
		navigate('/login');
	}

	function handleRegister(e: React.FormEvent){
		e.preventDefault();
		dispatch({
            type: CREATE_USER_REQUEST,
        });
        createUser(valueEmail, valuePassword, valueName)
        .then(checkReponse)
        .then((data: any) => {
            if(data.success){
                dispatch({
                    type: CREATE_USER_SUCCESS,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                    user: {
                        name: data.user.name,
                        email: data.user.email,
                        password: valuePassword,
                    }
                });
                setCookie("accessToken", data.accessToken, {expires: 1200});
                localStorage.setItem("refreshToken", data.refreshToken);
				navigate('/');
            }
            else{
                dispatch({
                    type: CREATE_USER_FAILED,
                });
            }
        })
        .catch((e: React.FormEvent) => {
            dispatch({
                type: CREATE_USER_FAILED,
            });
        });
	}

	return (
		<>
			<AppHeader />
			<div className={LoginStyle.wrap}>
				<form className={LoginStyle.form_area} onSubmit={handleRegister}>
					<p className="text text_type_main-medium">Регистрация</p>

					<Input
						type={"text"}
						placeholder={"Имя"}
						onChange={(e) => setValueName(e.target.value)}
						value={valueName}
						name={'name'}
						error={false}
						ref={inputRefName}
						errorText={"Ошибка"}
						size={"default"}
						extraClass="mt-6"
					/>

					<EmailInput
						placeholder={"Email"}
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
						{/*<Button htmlType="button" type="primary" size="medium" onClick={handleRegister}>
							Зарегистрироваться
	</Button>*/}

						<input className={ProfileStyle.buttonActive} type="submit" value="Зарегистрироваться" />
					</div>
					<div className="mt-20">
						<span className="text text_type_main-default text_color_inactive">
							Уже зарегистрированы?
						</span>
						<a className="ml-2" onClick={handleEnter}>
							Войти
						</a>
					</div>
				</form>
			</div>
		</>
	);
}

export default RegisterPage;
