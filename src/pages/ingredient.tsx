
import { useState } from "react";
import React from "react";
import {getIngredientsFunc } from "../services/actions";
import { IngredientDetailsParam }  from "../components/ingredient-details/ingredient-details";
import { useParams } from 'react-router-dom';
import IngredientStyle from "./ingredient.module.css";

type TIngredientDetailsParam = {
	ingredient: {};
};

export function IngredientPage(){
    const tempIngr: TIngredientDetailsParam= {
        ingredient: {}
    };
    const [ingredient, setIngredient] = useState<any>(tempIngr);
    const {id} = useParams<string>();

    React.useEffect(() => {
		getIngredientsFunc().then((ret: any) => {
            for(let i = 0; i < ret.data.length; i++){
                if(ret.data[i]._id === id){
                    setIngredient(ret.data[i]);
                    break;
                } 
            }
        });
	}, []);

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