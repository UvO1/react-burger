import React from 'react';
import CardIngredientStyle from './card-ingredient.module.css';
import { CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal.js';
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

function CardIngredient(props){
	const [isOpen, setOpen] = React.useState(false);
	const modal = (<Modal title="Детали ингредиента"  onClosed={handleCloseModal}>
		<IngredientDetails img ={props.ingredient.image} title={props.ingredient.name} 
		calories={props.ingredient.calories} 
		proteins={props.ingredient.proteins} 
		fat={props.ingredient.fat}
		carbohydrates={props.ingredient.carbohydrates}/>
		</Modal>);

	function handleOpenModal(){
		setOpen(true);
		console.log(isOpen);
	}

	function handleCloseModal(){
		setOpen(false);
		console.log(isOpen);
	}

	return(
		<>		
		{isOpen && modal}
		<div className={`${CardIngredientStyle.cardwrap} mb-8`} onClick={handleOpenModal}>
		<Counter count={1} size="default" extraClass="m-1" />
			<img src={props.ingredient.image} className={CardIngredientStyle.ingredient_image}/>
			<div className={`${CardIngredientStyle.price} mt-1 mb-1`}>
				<span className="text text_type_digits-default mr-2">{props.ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className={`${CardIngredientStyle.name} text text_type_main-default`}>{props.ingredient.name}</p>
			
		</div>
		</>
	);
}

CardIngredient.propTypes = {
    ingredient: messagePropTypes.isRequired
  };

export default CardIngredient; 