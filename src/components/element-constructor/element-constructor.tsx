import React from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { DECREASE_INGREDIENT } from "../../services/actions/ingredients";
import { DELETE_INGREDIENT } from "../../services/actions/burger";
import ElementConstructorStyle from "./element-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { REPLACE_ITEMS } from "../../services/actions/burger";
import { IIngredientUuid } from "../app/app";
import { FC } from "react";

type TElementConstructor = {
	tempElement: IIngredientUuid;
	index: number;
}

const ElementConstructor: FC<TElementConstructor> = ({tempElement, index}) => {
	const dispatch = useDispatch();
	const ref = React.useRef<HTMLInputElement>(null);
	const listIngredients: Array<IIngredientUuid> = useSelector((store) => store.burger.listIngredients);
	
  const [{ opacity }, drag] = useDrag({
		type: "burger",
		item: () => {
      return {index}
    },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	const [{ handlerId }, drop] = useDrop({
		accept: "burger",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item:any, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex: number = item.index;
			const hoverIndex: number = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect: DOMRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY: number =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset: XYCoord | null = monitor.getClientOffset();
			let hoverClientY: number = 0;
			if(clientOffset){
				hoverClientY= clientOffset.y - hoverBoundingRect.top;
			}

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			console.log(listIngredients);
			dispatch({
				type: REPLACE_ITEMS,
				dragIndex: dragIndex,
				hoverIndex: hoverIndex,
				listIngredients: listIngredients,
			});
			item.index = hoverIndex;
		},
	});

  
	function DeleteElement(key: string, id: string) {
		dispatch({
			type: DELETE_INGREDIENT,
			uuid: key,
		});
		dispatch({
			type: DECREASE_INGREDIENT,
			id: id,
		});
	}
  
	drag(drop(ref));

	return (
		<div
			className={ElementConstructorStyle.element_block}
			key={tempElement.uuid}
			draggable
			ref={ref}
			style={{ opacity }}
			data-handler-id={handlerId}
		>
			<DragIcon type="primary"/>
			<div className={`ml-2 ${ElementConstructorStyle.ingredient_block}`}>
				<ConstructorElement
					text={tempElement.name}
					price={tempElement.price}
					thumbnail={tempElement.image}
					handleClose={() => DeleteElement(tempElement.uuid, tempElement._id)}
				/>
			</div>
		</div>
	);
}

export default ElementConstructor;
