import { useParams } from "react-router-dom";
import OrderInfo from "../components/order-info/order-info";
import { useDispatch, useSelector } from "../services/hooks";
import { IMessages, IOrderWs } from "../components/feed/feed";
import React from "react";
import { WS_CONNECTION_START } from "../services/actions/ws";
import ProfileStyle from "./profile.module.css";
import { TIngredientDetailsParam } from "./ingredient";

export function FeedId(){
    const {id} = useParams<string>();
    const tempIngr: TIngredientDetailsParam= {
        ingredient: {}
    };
    const dispatch = useDispatch();
    let tempOrder: IOrderWs = {
        ingredients:[],
        _id: '',
        status: '',
        name: '',
        number: 0,
        createdAt: '',
        updatedAt: '',
    };
    const messages: IMessages = useSelector(store => store.ws.messages)
    React.useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
        });
	}, [dispatch]);

    return(<>
    {messages && messages.orders && messages.orders.map((temp, index) => {
        if(temp._id === id){
            tempOrder = temp;
            return(
                <div className={ProfileStyle.id_wrap} key={index}>
                    <div className={ProfileStyle.id_area} >
                        <OrderInfo data={temp} price={0} />
                    </div>
                </div>
            );
        }
    })}
    </>);
}