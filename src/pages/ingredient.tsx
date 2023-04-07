
import { useState } from "react";
import React from "react";
import { IngredientDetailsParam }  from "../components/ingredient-details/ingredient-details";
import { useParams } from 'react-router-dom';
import IngredientStyle from "./ingredient.module.css";
import { IIngredient } from "../components/types";
import { useSelector } from "../services/hooks";

export type TIngredientDetailsParam = {
	ingredient: {};
};

export function IngredientPage(){
    const tempIngr: TIngredientDetailsParam= {
        ingredient: {}
    };
    const [ingredient, setIngredient] = useState<any>(tempIngr);
    const {id} = useParams<string>();
    const ingredients: Array<IIngredient> = useSelector((store) => store.ingredients.ingredients);
    console.log(ingredients);

    React.useEffect(() => {
        if(ingredients){
            for(let i = 0; i < ingredients.length; i++){
                if(ingredients[i]._id === id){
                    setIngredient(ingredients[i]);
                    break;
                } 
            }
        }

	}, [ingredients]);

    return(
        <>
        { ingredient !== null &&
        <>
            <p className={`text text_type_main-large mt-30 ${IngredientStyle.center}`}>Детали ингредиента</p>
            <IngredientDetailsParam ingredient = {ingredient} />
            </>
        }
        </>
    );
}