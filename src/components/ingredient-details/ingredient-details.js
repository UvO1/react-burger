import React from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import doneImg from "../../images/done.svg";

function IngredientDetails(){

    return(
        <div className={IngredientDetailsStyles.wrap}>
            <img src="https://code.s3.yandex.net/react/code/meat-01.png" className={IngredientDetailsStyles.ingredient_image}/>
            <p className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}>Биокотлета из марсианской Магнолии</p>
            <div className={`${IngredientDetailsStyles.info} mt-8`}>
                <div className={IngredientDetailsStyles.item}>

                </div>
            </div>
        </div>
    );
}

export default IngredientDetails;