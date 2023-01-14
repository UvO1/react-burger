import React from 'react';
import BurgerConstructorStyle from './burger-constructor.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.js';

function BurgerConstructor(props){
	return(
		<div className = {`${BurgerConstructorStyle.area} pt-25 pl-4`}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
		      <div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
			      <ConstructorElement
			        type="top"
			        isLocked={true}
			        text="Краторная булка N-200i (верх)"
			        price={200}
			        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
			        
			      />

			    </div>
			    <div className = {BurgerConstructorStyle.scroll_area}>
		      {props.datas.map((tempElement) => {return( <div className = {BurgerConstructorStyle.element_block}><DragIcon type="primary" className="pr-2"/>
		      <div className={`ml-2 ${BurgerConstructorStyle.ingredient_block}`}> <ConstructorElement
		        text={tempElement.name}
		        price={tempElement.price}
		        thumbnail={tempElement.image} /></div></div>) })
		  		}
		  		</div>

		  	<div className={`${BurgerConstructorStyle.fix_element} ml-8`}>
		      <ConstructorElement
		        type="bottom"
		        isLocked={true}
		        text="Краторная булка N-200i (низ)"
		        price={200}
		        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
		        className="ml-8"
		      />
			  
		      </div>
		    </div>
		    <div className={`${BurgerConstructorStyle.order} mt-10`}>
		    	<p className = "text text_type_digits-medium mr-2">{610}</p>
		    	<div className = {BurgerConstructorStyle.icon}>
		    		<CurrencyIcon type="primary" className="ml-10"/>
		    	</div>
		    	<Button htmlType="button" type="primary" size="large" extraClass="ml-10">Оформить заказ</Button>
		    </div>

		</div>
	);
}

export default BurgerConstructor; 