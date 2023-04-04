import BurgerIngredientsStyle from "../burger-ingredients/burger-ingredients.module.css";
import PreviewOrder from "../preview-order/preview-order";
import FeedStyle from "./feed.module.css";
import { getIngredientsAction } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { CHANGE_MENU } from "../../services/actions/profile";
import React from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/actions/ws";

export interface IOrderWs{
    ingredients: Array<string>,
    _id: string,
    status: string,
    name: string;
    number: number,
    createdAt: string,
    updatedAt: string,
}

export interface IMessages{
    success: boolean,
    orders: Array<IOrderWs>,
    total: number,
    totalToday: number,
}

function Feed(){
    const dispatch = useDispatch();
    const messages: IMessages = useSelector(store => store.ws.messages)
    React.useEffect(() => {
        dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "orders",
        });
        dispatch({
            type: WS_CONNECTION_START,
        });
        return() => {
            dispatch({
                type: WS_CONNECTION_CLOSED,
            });
        };
	}, [dispatch]);

    return(
        <>
            <div className={`${FeedStyle.area} pl-5`}>
                <p className="text text_type_main-large mt-10 mb-1">Лента заказов</p>
                <div
                        className={FeedStyle.scroll_area}
                        id="scroll"
                    >
                        {messages && messages.orders && messages.orders.map((message: IOrderWs, index) => {
                            return(
                                <PreviewOrder data={message} from='feed' key={index}/>
                            );
                        })}
                    

                </div>
            </div>
            {messages && messages.orders &&
            <div className={`${FeedStyle.statistics_area} pl-5`}>
                <div className={`${FeedStyle.status}`}>
                    <div className={`${FeedStyle.status_area}`}>
                    <p className="text text_type_main-medium mb-4">Готовы:</p>
                        <div className={`${FeedStyle.ready}`}>
                            
                            {messages.orders.map((message: IOrderWs, index) => {
                                if((index < 10) && (message.status === 'done')){
                                    return <p className="text text_type_digits-default text_color_success mt-2" key={index}>{message.number}</p>
                                }
                            })}

            
                        </div>
                    </div>
                    <div className={`${FeedStyle.status_area} ml-9`}>
                        <p className="text text_type_main-medium mb-4">В работе:</p>
                        <div className={`${FeedStyle.in_work}`}>
                            
                            {messages.orders.map((message: IOrderWs, index) => {
                                if((index < 10) && (message.status === 'pending')){
                                    return <p className="text text_type_digits-default text_color_success mt-2" key={index}>{message.number}</p>
                                }
                            })}
                        </div>
                    </div>
                </div>
                <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{messages.total}</p>
                <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{messages.totalToday}</p>
            </div>
            }
        </>
    );
}

export default Feed;