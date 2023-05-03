import React from "react";
import OrderIngredientStyle from "./order-ingredient.module.css";
interface IOrderIngredient{
    ingrImage: string,
    index: number,
    active: boolean,
    plusNumber: number,
}

function OrderIngredient(props: IOrderIngredient){
    const tempZindex: number = 80 - props.index;
    let tempMargin: number = 0;
    let tempOpacity: number = 1;
    if(props.index > 0) tempMargin = -20;
    if(!props.active && props.index == 5) tempOpacity = 0.6;
    return(
        <div className={`${OrderIngredientStyle.image_area} ml-6`} style={{marginLeft: tempMargin, zIndex: tempZindex}}>          
            <img className={`${OrderIngredientStyle.image}`} src={props.ingrImage} style={{opacity: tempOpacity}} />
            {(props.plusNumber > 0) && (props.index == 5)&& 
                <span className={`${OrderIngredientStyle.plus} text text_type_main-small`}>+{props.plusNumber}</span>
            }
            
        </div>
    );
}
export default OrderIngredient;