import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import getIngredients from '../../utils/burger-api';



	function App() {
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: []
	});

	const checkReponse = (res: any) => {
		return res.ok ? res.json() : res.json().then((err: any) => {
			Promise.reject(err);
			setState({...state, isLoading: false, hasError: false});
			}
		);
  	};

	React.useEffect(() => {
	    const getData = async () => {
	    setState({
	    	...state,
	    	isLoading: true,
	    	hasError: false,
	    });	
		getIngredients()
		.then(checkReponse)
		.then(data => {
			setState({data: data.data, isLoading: false, hasError: false}); 
	    })
	    .catch(e => setState({...state, isLoading: false, hasError: true}))
  		} 
    getData();
	}, []);

  return (
  	<>
      <AppHeader/>
		{!state.hasError && 
		<div className={AppStyles.container}>
				<BurgerIngredients datas={state.data}/>
				<BurgerConstructor datas={state.data}/>
		</div>
		}
		{state.hasError && 
		<p>Ошибка загрузки данных</p>
		}
    </>
  );
}

export default App;
