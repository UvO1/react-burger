import React from 'react';
import BurgerIngredientsStyle from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

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


function CardIngredient(props){
	return(
		<div className={`${BurgerIngredientsStyle.cardwrap} mb-8`}>
		<Counter count={1} size="default" extraClass="m-1" />
			<img src={props.ingredient.image} className={BurgerIngredientsStyle.ingredient_image}/>
			<div className={`${BurgerIngredientsStyle.price} mt-1 mb-1`}>
				<span className="text text_type_digits-default mr-2">{props.ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${BurgerIngredientsStyle.name} text text_type_main-default`}>{props.ingredient.name}</p>

		</div>
	);
}

function WrapIngredient(props){
	return(
		<div className={`${BurgerIngredientsStyle.ingredient_wrap} pr-4`}>
			<p className="text text_type_main-medium mt-2 mb-6">{props.title}</p>
			<div className = "pl-4 " > {props.datas.map((tempIngr) => { return( <CardIngredient ingredient = {tempIngr} key= {tempIngr._id} />)} )}</div>
		</div>
	);
}

function BurgerIngredients(props){
	const [current, setCurrent] = React.useState('one')
	return(
		<div className = {`${BurgerIngredientsStyle.area} pl-5`}>
			<p className="text text_type_main-large mt-10">Cоберите бургер</p>
			<TabIngredients />
			<div className = {BurgerIngredientsStyle.scroll_area}>
			<WrapIngredient title="Булки" datas = {props.datas.filter(ingredient => (ingredient.type === "bun"))}/>
			<WrapIngredient title="Соусы" datas = {props.datas.filter(ingredient => (ingredient.type === "sauce"))}/>
			<WrapIngredient title="Начинка" datas = {props.datas.filter(ingredient => (ingredient.type === "main"))}/>
			</div>
		</div>
	);
}

export default BurgerIngredients; 