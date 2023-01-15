import React from 'react';
import logo from '../../images/logo.svg';
import AppStyles from './App.module.css';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';



function App() {
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: []
	});

	React.useEffect(() => {
		const ulrData = 'https://norma.nomoreparties.space/api/ingredients';
	    const getData = async () => {
	    setState({
	    	...state,
	    	isLoading: true,
	    	hasError: false,
	    });	
	    fetch(ulrData)
	    .then(res => res.json())
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
