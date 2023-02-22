import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { getIngredientsAction, getIngredientsFunc } from "../services/actions";
import  IngredientDetails, { IngredientDetailsParam }  from "../components/ingredient-details/ingredient-details";
import { Outlet, useParams } from 'react-router-dom';

export function IngredientPage(props){
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
            <IngredientDetailsParam ingredient={ingredient} />
        }
        </>
    );
}