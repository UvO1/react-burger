import React from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import doneImg from "../../images/done.svg";


function IngredientDetails(props){

    return(
        <div className={IngredientDetailsStyles.wrap}>
            <img src= {props.img} className={IngredientDetailsStyles.ingredient_image}/>
            <p className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}>{props.title}</p>
            <div className={`${IngredientDetailsStyles.info} mt-8`}>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.calories}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{props.proteins}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{props.fat}</p>
                </div>
                <div className={IngredientDetailsStyles.item}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
}
IngredientDetails.propTypes = {
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

export default IngredientDetails;