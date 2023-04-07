import IngredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector } from "../../services/hooks";
import { IIngredient } from "../types";
import { FC } from "react";

function IngredientDetails() {
	const ingredient: IIngredient | null = useSelector((store) => store.card.ingredient);
	return (
		(ingredient && 
		<div className={IngredientDetailsStyles.wrap} data-testid="ismodal">
			<img
				src={ingredient.image}
				className={IngredientDetailsStyles.ingredient_image}
				alt = {ingredient.name}
			/>
			<p
				className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}
				data-testid={"namemodal"}
			>
				{ingredient.name}
			</p>
			<div className={`${IngredientDetailsStyles.info} mt-8`}>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Калории, ккал</p>
					<p className="text text_type_digits-default">{ingredient.calories}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Белки, г</p>
					<p className="text text_type_digits-default">{ingredient.proteins}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Жиры, г</p>
					<p className="text text_type_digits-default">{ingredient.fat}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Углеводы, г</p>
					<p className="text text_type_digits-default">
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>)	
	);
}
type TIngredientDetailsParam = {
	ingredient: IIngredient;
};

export const IngredientDetailsParam: FC<TIngredientDetailsParam > = (props: TIngredientDetailsParam ) => {
	return (
		<div className={IngredientDetailsStyles.wrap}>
			<img
				src={props.ingredient.image}
				className={IngredientDetailsStyles.ingredient_image}
				alt = {props.ingredient.name}
			/>
			<p
				className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}
			>
				{props.ingredient.name}
			</p>
			<div className={`${IngredientDetailsStyles.info} mt-8`}>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Калории, ккал</p>
					<p className="text text_type_digits-default">{props.ingredient.calories}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Белки, г</p>
					<p className="text text_type_digits-default">{props.ingredient.proteins}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Жиры, г</p>
					<p className="text text_type_digits-default">{props.ingredient.fat}</p>
				</div>
				<div className={IngredientDetailsStyles.item}>
					<p className="text text_type_main-default">Углеводы, г</p>
					<p className="text text_type_digits-default">
						{props.ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
}

export default IngredientDetails;
