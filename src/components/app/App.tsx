import React from 'react';
import logo from '../../images/logo.svg';
import AppStyles from './App.module.css';
import AppHeader from '../app-header/app-header.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import Data from './data.json';
import Modal from '../modal/modal.js';
import OrderDetails from '../order-details/order-details.js';

/*const ModalOrderDetails = Modal(OrderDetails);*/

function App() {
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: null
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
	    .then(data => {setState({data: data, isLoading: false, hasError: false}); 
	    	const extraData = data;
	    })
	    .catch(e => setState({...state, isLoading: false, hasError: true}))
   
  		} 
    //getData();
	}, []);

	console.log(state.data);
	

  return (
  	<>
      <AppHeader/>
	  <div id="react-modals"></div>
      <div className={AppStyles.container}>

      	<BurgerIngredients datas={Data}/>
      	<BurgerConstructor datas={Data}/>
		{<Modal/>}
	</div>
		
    </>
  );
}

export default App;
