import React from "react";
import AppStyles from "../components/app/app.module.css";
import AppHeader from "../components/app-header/app-header.js";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsAction } from "../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function HomePage(){
    const dispatch = useDispatch();
	const hasError = useSelector(store => store.ingredients.hasError);

	React.useEffect(() => {
		dispatch(getIngredientsAction());
	}, [dispatch]);

    return(
        <>
            <AppHeader />
            {!hasError && (
                <main className={AppStyles.wrap}>
                    <div className={AppStyles.container}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor />
                        </DndProvider>
                    </div>
                </main>
            )}
            {hasError && <p>Ошибка загрузки данных</p>}
        </>
    );
}

