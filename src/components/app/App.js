import React from "react";
import AppStyles from "./App.module.css";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { getIngredients } from "../../utils/burger-api";
import { IngredientsContext } from "../../utils/ingredients-context";
import { checkReponse } from "../../utils/burger-api";

function App() {
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
	});
	const [ingredients, setIngredients] = React.useState([]);

	React.useEffect(() => {
		const getData = async () => {
			setState({
				...state,
				isLoading: true,
				hasError: false,
			});
			getIngredients()
				.then(checkReponse)
				.then((data) => {
					setState({ data: data.data, isLoading: false, hasError: false });
					setIngredients(data.data);
				})
				.catch((e) => setState({ ...state, isLoading: false, hasError: true }));
		};
		getData();
	}, []);
	return (
		<>
			<AppHeader />
			{!state.hasError && (
				<div className={AppStyles.wrap}>
					<div className={AppStyles.container}>
						<IngredientsContext.Provider
							value={{ ingredients}}
						>
							<BurgerIngredients datas={state.data} />
							<BurgerConstructor />
						</IngredientsContext.Provider>
					</div>
				</div>
			)}
			{state.hasError && <p>Ошибка загрузки данных</p>}
		</>
	);
}

export default App;
