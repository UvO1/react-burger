import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {HomePage} from "../../pages/home.js";
import LoginPage from "../../pages/login.js";
import RegisterPage from "../../pages/register.js";
import ForgotPasswordPage from "../../pages/forgot-password.js";
import ResetPasswordPage from "../../pages/reset-password.js";
import ProfilePage from "../../pages/profile.js";
import { NotFound } from "../../pages/not-found.js";
import { ProtectedRouteElementAuth, ProtectedRouteElementNoAuth, ProtectedRouteElementResertPassword } from "../protected-route/protected-route.js";
import { IngredientPage } from "../../pages/ingredient.js";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import { Outlet } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage/>} />
				<Route path="/ingredients/" element={<div><Outlet /></div>}>
					<Route path=":id" element={<IngredientPage />} />
				</Route>
				<Route path="/login" element={<ProtectedRouteElementNoAuth element={<LoginPage/>} />} />
				<Route path="/register" element={<ProtectedRouteElementNoAuth element={<RegisterPage/>} />} />
				<Route path="/forgot-password" element={<ProtectedRouteElementNoAuth element={<ForgotPasswordPage/>} />} />
				<Route path="/reset-password" element={<ProtectedRouteElementResertPassword element={<ResetPasswordPage/>} />} />
				<Route path="/profile" element={<ProtectedRouteElementAuth element={<ProfilePage/>} />} />
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</BrowserRouter>
		
	);
}

export default App;
