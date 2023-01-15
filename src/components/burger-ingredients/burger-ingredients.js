import React from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import CardIngredient from '../card-ingredient/card-ingredient';
import PropTypes from 'prop-types';

const messagePropTypes = PropTypes.shape({
	_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
  });
  
function TabIngredients(){
  const [current, setCurrent] = React.useState('one')
  return (
    <div style={{ display: 'flex' }} className={`${BurgerIngredientsStyle.tabs} mt-5 mb-8`}>
      <Tab style="min-width: 33%" value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}


function BurgerIngredients(props){
	const [isOpen, setOpen] = React.useState(false);
	const datas_bun = props.datas.filter(ingredient => (ingredient.type === "bun"));
	const datas_sauce = props.datas.filter(ingredient => (ingredient.type === "sauce"));
	const datas_main = props.datas.filter(ingredient => (ingredient.type === "main"));

	function handleOpenModal(){
		setOpen(true);
		console.log(isOpen);
	}

	function handleCloseModal(){
		setOpen(false);
		console.log(isOpen);
	}
	return(
		<div className = {`${BurgerIngredientsStyle.area} pl-5`}>
			<p className="text text_type_main-large mt-10">Cоберите бургер</p>
			<TabIngredients />
			<div className = {BurgerIngredientsStyle.scroll_area}>
				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Булки</p>
					<div className = "pl-4 " > {
						datas_bun.map((tempIngr) => { return( <CardIngredient ingredient = {tempIngr} key= {tempIngr._id} />)} )
					}
					</div>
				</div>

				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Соусы</p>
					<div className = "pl-4 " > {
						datas_sauce.map((tempIngr) => { return( <CardIngredient ingredient = {tempIngr} key= {tempIngr._id} />)} )
					}
					</div>
				</div>

				<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
					<p className="text text_type_main-medium mt-2 mb-6">Начинки</p>
					<div className = "pl-4 " > {
						datas_main.map((tempIngr) => { return( <CardIngredient ingredient = {tempIngr} key= {tempIngr._id} />)} )
					}
					</div>
				</div>

			</div>
		</div>
	);
}

BurgerIngredients.propTypes = {
	datas: PropTypes.arrayOf(messagePropTypes).isRequired
  };

export default BurgerIngredients; 