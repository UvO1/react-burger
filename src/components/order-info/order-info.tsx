import OrderInfoStyles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientRow from "../ingredient-row/ingredient-row";
import { IOrderWs } from "../feed/feed";
import { IIngredient } from "../app/app";
import { useSelector } from "../../services/hooks";
import React from "react";
import { useDispatch } from "../../services/hooks";
import { getIngredientsAction } from "../../services/actions";
import { useState } from "react";

interface IOrderInfo{
    data: IOrderWs,
    price: number,
}

function OrderInfo(props: IOrderInfo){
    const dispatch = useDispatch();
    let tempStatus = '';
    let priceOfOrder: number = 0;
    const ingredients: Array<IIngredient> = useSelector((store) => store.ingredients.ingredients);
    React.useEffect(() => {
        if(props.price === 0 ){
            dispatch<any>(getIngredientsAction());
        }
    }, []);

    if(props.data.status === 'done'){
        tempStatus = 'Выполнен';
    }
    else tempStatus = 'Готовится';
    props.data.ingredients.map((ingred: string) => {
        ingredients.map(element => {
            if(element._id === ingred) {
                priceOfOrder+= element.price;
                return;
            }
        });
    });
    return(
        
    <div className={` ${OrderInfoStyles.wrap} pl-10 pr-10`}>
        <p className={` ${OrderInfoStyles.order_number} text text_type_digits-default`}>#{props.data.number}</p>
        <p className="text text_type_main-medium mt-10">{props.data.name}</p>
        <p className="text text_type_main-default text_color_success mt-3">{tempStatus}</p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <div className={`${OrderInfoStyles.scroll_area} mt-6`}
            id="scroll">
                {props.data.ingredients.map((ingred: string, index) => {
                    let tempImage: string = '';
                    let allPrice: number = 0;
                    let tempName: string = '';
                    let tempPrice: number = 0;
                    ingredients.map(element => {
                        if(element._id === ingred) {
                            tempImage = element.image;
                            tempName = element.name;
                            tempPrice = element.price;
                            allPrice += element.price;
                            return;
                        }
                    });
                    return(<IngredientRow image = {tempImage} name={tempName} price = {tempPrice} key={index}/>);
                })}
        </div>
        <div className={`${OrderInfoStyles.info_price} mt-10`}>
            <p className={`text text_type_main-default text_color_inactive`}>{props.data.createdAt}</p>
            <div className={OrderInfoStyles.price}>
                <span className="text text_type_digits-default mr-2">{(props.price===0) ? priceOfOrder : props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
       

                        
    </div>
    );
}

export default OrderInfo;