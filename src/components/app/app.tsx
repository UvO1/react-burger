import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import {HomePage} from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import { NotFound } from "../../pages/not-found";
import { ProtectedRouteElementAuth, ProtectedRouteElementNoAuth, ProtectedRouteElementResertPassword } from "../protected-route/protected-route";
import { IngredientPage } from "../../pages/ingredient";
import { Outlet } from 'react-router-dom';
import ProfileOrdersPage from '../../pages/profile-orders';
import FeedPage from '../../pages/feed';
import { FeedId } from '../../pages/feed-id';
import { ProfileOrderId } from '../../pages/profile-order-id';
import AppHeader from '../app-header/app-header';
import { useDispatch } from '../../services/hooks';
import { getIngredientsAction } from '../../services/actions';

export interface IIngredient{
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	count: number;
}

export interface IIngredientUuid extends IIngredient{
	uuid: string;
}

function App() {
	const dispatch = useDispatch();
	dispatch<any>(getIngredientsAction());
	return (
		<HashRouter>
			<AppHeader />
			<Routes>
				<Route path="/" element={<ProtectedRouteElementAuth element={<HomePage/>} />} />
				<Route path="/ingredients/" element={<div><Outlet /></div>}>
					<Route path=":id" element={<IngredientPage />} />
				</Route>
				<Route path="/login" element={<ProtectedRouteElementNoAuth element={<LoginPage/>} />} />
				<Route path="/register" element={<ProtectedRouteElementNoAuth element={<RegisterPage/>} />} />
				<Route path="/forgot-password" element={<ProtectedRouteElementNoAuth element={<ForgotPasswordPage/>} />} />
				<Route path="/reset-password" element={<ProtectedRouteElementResertPassword element={<ResetPasswordPage/>} />} />
				<Route path="/profile" element={<ProtectedRouteElementAuth element={<ProfilePage/>} />} />
				<Route path="/profile/orders/" element={<ProtectedRouteElementAuth element={<ProfileOrdersPage/>} />} />
				<Route path="/profile/orders/" element={<ProtectedRouteElementAuth element={<div><Outlet /></div>} />} >
					<Route path=":id" element = {<ProtectedRouteElementAuth element={<ProfileOrderId />} />}/>
				</Route>
				<Route path="/feed/" element={<FeedPage/> }/>
				<Route path="/feed/" element={<div><Outlet /></div>}>
					<Route path=":id" element={<FeedId />} />
				</Route>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</HashRouter>
		
	);
}

export default App;
