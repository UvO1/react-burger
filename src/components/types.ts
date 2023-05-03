export interface IIngredient{
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	count: number;
}
export interface IIngredientUuid extends IIngredient{
	uuid: string;
}

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