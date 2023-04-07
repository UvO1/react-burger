import React from "react";
import LoginStyle from "./login.module.css";
import { useNavigate} from "react-router-dom";
import {
	EmailInput,
	PasswordInput,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../services/hooks";
import { createUserAction} from "../services/actions/authorization";
import ProfileStyle from "./profile.module.css";
import { useSelector } from "../services/hooks";

export function RegisterPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [valueName, setValueName] = React.useState<string>("");
	const inputRefName = React.useRef<HTMLInputElement>(null);
	const tempUser = useSelector((store) => store.authorization.isAuthorized);
    
	const [valueEmail, setValueEmail] = React.useState<string>("");
	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueEmail(e.target.value);
	};
	const [valuePassword, setValuePassword] = React.useState<string>("");
	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValuePassword(e.target.value);
	};

	React.useEffect(()=>{
		if(tempUser) navigate('/');
	},[tempUser]);

	function handleEnter(){
		navigate('/login');
	}

	function handleRegister(e: React.FormEvent){
		e.preventDefault();
		dispatch<any>(createUserAction(valueEmail, valuePassword, valueName));
	}

	return (
		<>
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
