import OrderInfoStyles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientRow from "../ingredient-row/ingredient-row";
import { IOrderWs } from "../types";
import { IIngredient } from "../types";
import { useSelector } from "../../services/hooks";
import React from "react";

interface IOrderInfo{
    data: IOrderWs,
    price: number,
}

function OrderInfo(props: IOrderInfo){
    let tempStatus = '';
    let priceOfOrder: number = 0;
    const ingredients: Array<IIngredient> = useSelector((store) => store.ingredients.ingredients);

    if(props.data.status === 'done'){
        tempStatus = 'Выполнен';
    }
    else tempStatus = 'Готовится';

    let countItems = new Map();
    for (const item of props.data.ingredients){
        let counter: number| undefined = countItems.get(item);
        countItems.set(item, counter ? counter + 1 : 1);
        
        ingredients.map(element => {
            if(element._id === item) {
                priceOfOrder+= element.price;
                return;
            }
        });
    }
    let content: Array<React.ReactNode> = [];
    countItems.forEach((tCount, tUid) => {
        ingredients.map((element, index) => {
            if(element._id === tUid) {
                content.push(<IngredientRow image = {element.image} name={element.name} count = {tCount} price = {element.price} key={index}/>);
            }
        });
    })
    const time = props.data.createdAt.substring(11,19).toString();
    const day = props.data.createdAt.substring(8,10).toString();
    const month = props.data.createdAt.substring(5,7).toString();
    const year = props.data.createdAt.substring(0,4).toString();

    let orderData = day + '.'+month + '.' + year + ', ' + time;

    return(
    <div className={` ${OrderInfoStyles.wrap} pl-10 pr-10`}>
        <p className={` ${OrderInfoStyles.order_number} text text_type_digits-default`}>#{props.data.number}</p>
        <p className="text text_type_main-medium mt-10">{props.data.name}</p>
        <p className="text text_type_main-default text_color_success mt-3">{tempStatus}</p>
        <p className="text text_type_main-medium mt-15">Состав:</p>
        <div className={`${OrderInfoStyles.scroll_area} mt-6`}
            id="scroll">
                {content.map((element, index)=>{
                    
                    return element;
                })}
        </div>
        <div className={`${OrderInfoStyles.info_price} mt-10`}>
            <p className={`text text_type_main-default text_color_inactive`}>{orderData}</p>
            <div className={OrderInfoStyles.price}>
                <span className="text text_type_digits-default mr-2">{(props.price===0) ? priceOfOrder : props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
        </div>
       

                        
    </div>
    );
}

export default OrderInfo;