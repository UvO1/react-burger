import PreviewOrderStyle from "./preview-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderIngredient from "../order-ingredient/order-ingredient";
import { IIngredient } from "../types";
import {ReactNode} from 'react';
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";
import { useDispatch, useSelector } from "../../services/hooks";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/modal";
import { IOrderWs } from "../types";
import { useState } from "react";

interface IPreviewOrder{
    data: IOrderWs,
    from: 'profile' | 'feed',
}

function PreviewOrder(props: IPreviewOrder){
    const ingredients: Array<IIngredient> = useSelector((store) => store.ingredients.ingredients);
    const dispatch = useDispatch();
    const isOpenModal: boolean = useSelector((store) => store.modal.isOpen);
    const [openedId, setOpenedId] = useState<string>('');
    let totalPrice: number = 0;
    let arrayImages: Array<string> = [];
    for ( let i in props.data.ingredients){
        ingredients.map(element => {
            if(element._id === props.data.ingredients[i]) {
                totalPrice += element.price;
                arrayImages.push(element.image);
            }
        });
    }
    const time = props.data.createdAt.substring(11,19).toString();
    const day = props.data.createdAt.substring(8,10).toString();
    const month = props.data.createdAt.substring(5,7).toString();
    const year = props.data.createdAt.substring(0,4).toString();

    let orderData = day + '.'+month + '.' + year + ', ' + time;

    const modal: ReactNode = (
		<Modal title="" onClosed={handleCloseModal}>
			<OrderInfo data={props.data} price={totalPrice}/>
		</Modal>
	);

    function handleOpenModal() {
        if(props.from === 'feed'){
		    window.history.replaceState(null, "", "/react-burger/#/feed/" + props.data._id);
        }
        else if(props.from === 'profile'){
		    window.history.replaceState(null, "", "/react-burger/#/profile/orders/" + props.data._id);
        }
        setOpenedId(props.data._id);
		    dispatch({
			    type: OPEN_MODAL,
		    });
	}

	function handleCloseModal() {
        if(props.from === 'feed'){
		    window.history.replaceState(null, "", "/react-burger/#/feed");
        }
        else if(props.from === 'profile'){
            window.history.replaceState(null, "", "/react-burger/#/profile/orders");
        }
        setOpenedId('');
		dispatch({
			type: CLOSE_MODAL,
		});
	}

    return(
        <>
        {isOpenModal  && props.data && (openedId === props.data._id) && modal}
        <div className={`${PreviewOrderStyle.area} mt-4 mr-2 p-6`}
        onClick={handleOpenModal}>
            <div className={`${PreviewOrderStyle.order_info}`}>
                <p className={`text text_type_digits-default`}>#{props.data.number}</p>
                <p className={`text text_type_main-default text_color_inactive`}>
{orderData}
</p>
            </div>
            <p className="text text_type_main-medium mt-6">{props.data.name}</p>
            <div className={`${PreviewOrderStyle.burger_info} mt-6`}>
                    <div className={`${PreviewOrderStyle.list_ingredient}`}>
                        <div className={`${PreviewOrderStyle.list_ingredient}`}>
                            <div className={`${PreviewOrderStyle.list_ingredient}`}>
                                {props.data.ingredients.map((temp_id: string, index: number) => {
                                    let isLastActive: boolean = true;
                                    let plusNumber: number = 0;
                                    if(props.data.ingredients.length > 6){
                                         isLastActive = false;
                                         plusNumber = props.data.ingredients.length - 6;
                                    }
                                    if(index <= 5){
                                         return(<OrderIngredient ingrImage={arrayImages[index]} index={index} active={isLastActive} plusNumber ={plusNumber} key={index}/>);
                                    }
                                })}
                                
                            </div>
                        </div>
                    </div>
                    <div className={`${PreviewOrderStyle.icon} mr-10`}>
                        <p className="text text_type_digits-default mr-2">{totalPrice}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
        </div>
        </>
    );
}
export default PreviewOrder;