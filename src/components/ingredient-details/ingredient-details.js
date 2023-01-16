import React from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import messagePropTypes from '../../utils/prop-types'

function IngredientDetails(props){
    return(
        <div className={IngredientDetailsStyles.wrap}>
            <img src= {props.ingredient.image} className={IngredientDetailsStyles.ingredient_image}/>
            <p className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}>{props.ingredient.title}</p>
            <div className={`${IngredientDetailsStyles.info} mt-8`}>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.ingredient.calories}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.proteins}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.fat}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredient: messagePropTypes.isRequired
}

export default IngredientDetails;