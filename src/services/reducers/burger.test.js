import { burgerReducer } from "./burger";
import * as types from "../actions/burger";

describe("todos reducer", () => {
	it("should return the initial state", () => {
		expect(burgerReducer(undefined, {})).toEqual({
			buns: null,
			listIngredients: [],
			payload: null,
		});
	});
	it("should handle ADD_BUN", () => {
		expect(
			burgerReducer([], {
				type: types.ADD_BUN,
				buns: {
					_id: "id",
					name: "name",
					type: "type",
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 4,
					price: 5,
					image: "src_image",
					image_mobile: "src_image_mobile",
					image_large: "src_image_large",
					__v: 6,
					count: 7,
				},
			})
		).toEqual({
			buns: {
				_id: "id",
				name: "name",
				type: "type",
				proteins: 1,
				fat: 2,
				carbohydrates: 3,
				calories: 4,
				price: 5,
				image: "src_image",
				image_mobile: "src_image_mobile",
				image_large: "src_image_large",
				__v: 6,
				count: 7,
			},
		});
	});
	it("should handle ADD_INGREDIENT", () => {
		expect(
			burgerReducer({
                listIngredients:
				[
					{
						_id: "id1",
						name: "name1",
						type: "type1",
						proteins: 11,
						fat: 22,
						carbohydrates: 33,
						calories: 44,
						price: 55,
						image: "src_image1",
						image_mobile: "src_image_mobile1",
						image_large: "src_image_large1",
						__v: 66,
						count: 77,
						uuid: "uuid1",
					}
				]},
				{
					type: types.ADD_INGREDIENT,
					payload: {
						_id: "id",
						name: "name",
						type: "type",
						proteins: 1,
						fat: 2,
						carbohydrates: 3,
						calories: 4,
						price: 5,
						image: "src_image",
						image_mobile: "src_image_mobile",
						image_large: "src_image_large",
						__v: 6,
						count: 7,
						uuid: "uuid",
					},
				}
			)
		).toEqual({
			listIngredients: [
				{
					_id: "id1",
					name: "name1",
					type: "type1",
					proteins: 11,
					fat: 22,
					carbohydrates: 33,
					calories: 44,
					price: 55,
					image: "src_image1",
					image_mobile: "src_image_mobile1",
					image_large: "src_image_large1",
					__v: 66,
					count: 77,
					uuid: "uuid1",
				},
				{
					_id: "id",
					name: "name",
					type: "type",
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 4,
					price: 5,
					image: "src_image",
					image_mobile: "src_image_mobile",
					image_large: "src_image_large",
					__v: 6,
					count: 7,
					uuid: "uuid",
				},
			],
		});
	});
    it("should handle DELETE_INGREDIENT", () => {
		expect(
			burgerReducer({
                listIngredients:
				[
                    {
						_id: "id",
						name: "name",
						type: "type",
						proteins: 1,
						fat: 2,
						carbohydrates: 3,
						calories: 4,
						price: 5,
						image: "src_image",
						image_mobile: "src_image_mobile",
						image_large: "src_image_large",
						__v: 6,
						count: 7,
						uuid: "uuid_need_to_delete",
					},
					{
						_id: "id1",
						name: "name1",
						type: "type1",
						proteins: 11,
						fat: 22,
						carbohydrates: 33,
						calories: 44,
						price: 55,
						image: "src_image1",
						image_mobile: "src_image_mobile1",
						image_large: "src_image_large1",
						__v: 66,
						count: 77,
						uuid: "uuid1",
					}
				]},
				{
					type: types.DELETE_INGREDIENT,
					uuid: "uuid_need_to_delete"
				}
			)
		).toEqual({
			listIngredients: [
				{
					_id: "id1",
					name: "name1",
					type: "type1",
					proteins: 11,
					fat: 22,
					carbohydrates: 33,
					calories: 44,
					price: 55,
					image: "src_image1",
					image_mobile: "src_image_mobile1",
					image_large: "src_image_large1",
					__v: 66,
					count: 77,
					uuid: "uuid1",
				}
			],
		});
	});
    it("should handle CLEAR_BURGER", () => {
		expect(
			burgerReducer([], {
				type: types.CLEAR_BURGER,
				buns: {
					_id: "id",
					name: "name",
					type: "type",
					proteins: 1,
					fat: 2,
					carbohydrates: 3,
					calories: 4,
					price: 5,
					image: "src_image",
					image_mobile: "src_image_mobile",
					image_large: "src_image_large",
					__v: 6,
					count: 7,
				},
			})
		).toEqual({
			buns: null,
            listIngredients: [],
		});
	});
    it("should handle REPLACE_ITEMS", () => {
		expect(
			burgerReducer([], {
				type: types.REPLACE_ITEMS,
				listIngredients:[
                    {
						_id: "id",
						name: "name",
						type: "type",
						proteins: 1,
						fat: 2,
						carbohydrates: 3,
						calories: 4,
						price: 5,
						image: "src_image",
						image_mobile: "src_image_mobile",
						image_large: "src_image_large",
						__v: 6,
						count: 7,
						uuid: "uuid",
					},
                    {
						_id: "id1",
						name: "name1",
						type: "type1",
						proteins: 11,
						fat: 22,
						carbohydrates: 33,
						calories: 44,
						price: 55,
						image: "src_image1",
						image_mobile: "src_image_mobile1",
						image_large: "src_image_large1",
						__v: 66,
						count: 77,
						uuid: "uuid1",
					},
                    {
						_id: "id2",
						name: "name2",
						type: "type2",
						proteins: 111,
						fat: 222,
						carbohydrates: 333,
						calories: 444,
						price: 555,
						image: "src_image2",
						image_mobile: "src_image_mobile2",
						image_large: "src_image_large2",
						__v: 666,
						count: 777,
						uuid: "uuid2",
					}
				],
                dragIndex: 1,
                hoverIndex: 0,
			})
		).toEqual({
            listIngredients:[
                {
                    _id: "id1",
                    name: "name1",
                    type: "type1",
                    proteins: 11,
                    fat: 22,
                    carbohydrates: 33,
                    calories: 44,
                    price: 55,
                    image: "src_image1",
                    image_mobile: "src_image_mobile1",
                    image_large: "src_image_large1",
                    __v: 66,
                    count: 77,
                    uuid: "uuid1",
                },
                {
                    _id: "id",
                    name: "name",
                    type: "type",
                    proteins: 1,
                    fat: 2,
                    carbohydrates: 3,
                    calories: 4,
                    price: 5,
                    image: "src_image",
                    image_mobile: "src_image_mobile",
                    image_large: "src_image_large",
                    __v: 6,
                    count: 7,
                    uuid: "uuid",
                },
                {
                    _id: "id2",
                    name: "name2",
                    type: "type2",
                    proteins: 111,
                    fat: 222,
                    carbohydrates: 333,
                    calories: 444,
                    price: 555,
                    image: "src_image2",
                    image_mobile: "src_image_mobile2",
                    image_large: "src_image_large2",
                    __v: 666,
                    count: 777,
                    uuid: "uuid2",
                }
            ]
		});
	});

});
