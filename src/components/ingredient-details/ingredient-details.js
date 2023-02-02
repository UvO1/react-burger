import IngredientDetailsStyles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
function IngredientDetails() {
	const ingredient = useSelector((store) => store.card.ingredient);
	return (
		<div className={IngredientDetailsStyles.wrap}>
			<img
				src={ingredient.image}
				className={IngredientDetailsStyles.ingredient_image}
				alt = {ingredient.name}
			/>
			<p
				className={`${IngredientDetailsStyles.title} text text_type_main-medium mt-4`}
			>
				{ingredient.title}
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
		</div>
	);
}

export default IngredientDetails;
