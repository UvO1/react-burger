import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { DECREASE_INGREDIENT } from "../../services/actions/ingredients";
import { DELETE_INGREDIENT } from "../../services/actions/burger";
import ElementConstructorStyle from "./element-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { REPLACE_ITEMS } from "../../services/actions/burger";
import messagePropTypes from "../../utils/prop-types";
import PropTypes from "prop-types";

const ElementConstructor = ({tempE, index}) => {
	const tempElement = tempE;
	const dispatch = useDispatch();
	const ref = React.useRef(null);
	const listIngredients = useSelector((store) => store.burger.listIngredients);
	
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
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			dispatch({
				type: REPLACE_ITEMS,
				dragIndex: dragIndex,
				hoverIndex: hoverIndex,
				listIngredients: listIngredients,
			});
			item.index = hoverIndex;
		},
	});

  
	function DeleteElement(key, id) {
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
			<DragIcon type="primary" className="pr-2" />
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

ElementConstructor.propTypes = {
	index: PropTypes.number.isRequired,
	tempE: messagePropTypes.isRequired,
};

export default ElementConstructor;
