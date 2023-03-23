import IngredientRowStyle from "./ingredient-row.module.css";
import OrderIngredient from "../order-ingredient/order-ingredient";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IIngredientRow{
    image: string,
    name: string,
    price: number,
    count: number,
}

function IngredientRow(props: IIngredientRow){
    return(<div className={`${IngredientRowStyle.area} mb-4 pr-6 mb-4`}>
        <div className={IngredientRowStyle.img_name}>
            <OrderIngredient ingrImage={props.image} index={0} active={true} plusNumber={0} />
            <p className="text text_type_main-default ml-4">{props.name}</p>
        </div>
        <div className={IngredientRowStyle.price}>
            <span className="text text_type_digits-default mr-2">{props.count} X {props.price}</span>
            <CurrencyIcon type="primary" />
        </div>
    </div>);
}

export default IngredientRow;