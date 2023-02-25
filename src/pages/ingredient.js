import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { getIngredientsAction, getIngredientsFunc } from "../services/actions";
import  IngredientDetails, { IngredientDetailsParam }  from "../components/ingredient-details/ingredient-details";
import { Outlet, useParams } from 'react-router-dom';
import IngredientStyle from "./ingredient.module.css";

export function IngredientPage(){
    const [ingredient, setIngredient] = useState(null);
    const {id} = useParams();

    React.useEffect(() => {
		getIngredientsFunc().then((ret) => {
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
            <IngredientDetailsParam ingredient={ingredient} />
            </>
        }
        </>
    );
}