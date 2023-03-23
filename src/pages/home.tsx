import React from "react";
import AppStyles from "../components/app/app.module.css";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "../services/hooks";
import { getIngredientsAction } from "../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CHANGE_MENU } from "../services/actions/profile";

export function HomePage(){
    const dispatch = useDispatch();
	const hasError: boolean = useSelector((store) => store.ingredients.hasError);

    
	React.useEffect(() => {
		dispatch<any>(getIngredientsAction());
		dispatch({
            type: CHANGE_MENU,
            isActiveMenu: "constructor",
        });
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

