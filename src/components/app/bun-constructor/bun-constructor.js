import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function BunConstructor(props){
    let nameBun = "название булки";
    if(props.type === "top"){
        nameBun = nameBun + " (верх)"
    }
    else{
        nameBun = nameBun + " (низ)"
    }
   
    return(

        <ConstructorElement
					type={props.type}
					isLocked={true}
					text={nameBun}
					price={""}
					thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
		/>	
    );
}

export default BunConstructor;