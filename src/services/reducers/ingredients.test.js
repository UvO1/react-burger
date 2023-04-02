import {getIngredientsReducer} from "./ingredients";
import * as types from "../actions/ingredients";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(getIngredientsReducer(undefined, {})).toEqual(
            {
                isLoading: false,
                hasError: false,
                ingredients: [],
            }
        )
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(getIngredientsReducer({
            isLoading: false,
            hasError: false,
            ingredients: [],
        },{
            type: types.GET_INGREDIENTS_REQUEST
        })).toEqual(
            {
                isLoading: true,
                hasError: false,
                ingredients: [],
            }
        )
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(getIngredientsReducer({
            ingredients: []
        },{
            type: types.GET_INGREDIENTS_SUCCESS,
            ingredients: [{
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
            }]
        })).toEqual(
            {
                ingredients: [{
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
                }]
            }
        )
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(getIngredientsReducer({
            hasError: true,
			isLoading: false,
        },{
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual(
            {
				hasError: true,
				isLoading: false,
            }
        )
    })
    it('should handle INCREASE_INGREDIENT', () => {
        expect(getIngredientsReducer({
            ingredients: [
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
                },
                {
                    _id: "id_need_to_increase",
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
                },
                {
                    _id: "id_need_to_increase",
                    name: "name2",
                    type: "bun",
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
                }
            ],
        },{
            type: types.INCREASE_INGREDIENT,
            id: 'id_need_to_increase'
        })).toEqual(
            {
                ingredients: [{
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
                {
                    _id: "id_need_to_increase",
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
                    count: 78,
                },
                {
                    _id: "id_need_to_increase",
                    name: "name2",
                    type: "bun",
                    proteins: 111,
                    fat: 222,
                    carbohydrates: 333,
                    calories: 444,
                    price: 555,
                    image: "src_image2",
                    image_mobile: "src_image_mobile2",
                    image_large: "src_image_large2",
                    __v: 666,
                    count: 779,
                }]
            }
        )
    })
    it('should handle DECREASE_INGREDIENT', () => {
        expect(getIngredientsReducer({
            ingredients: [
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
                },
                {
                    _id: "id_need_to_decrease",
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
                },
                {
                    _id: "id_need_to_decrease",
                    name: "name2",
                    type: "bun",
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
                }
            ],
        },{
            type: types.DECREASE_INGREDIENT,
            id: 'id_need_to_decrease'
        })).toEqual(
            {
                ingredients: [{
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
                {
                    _id: "id_need_to_decrease",
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
                    count: 76,
                },
                {
                    _id: "id_need_to_decrease",
                    name: "name2",
                    type: "bun",
                    proteins: 111,
                    fat: 222,
                    carbohydrates: 333,
                    calories: 444,
                    price: 555,
                    image: "src_image2",
                    image_mobile: "src_image_mobile2",
                    image_large: "src_image_large2",
                    __v: 666,
                    count: 775,
                }]
            }
        )
    })
    it('should handle DECREASE_BUNS', () => {
        expect(getIngredientsReducer({
            ingredients: [
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
                },
                {
                    _id: "id_maybe_need_to_decrease",
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
                },
                {
                    _id: "id_maybe_need_to_decrease",
                    name: "name2",
                    type: "bun",
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
                }
            ]
        },{
            type: types.DECREASE_BUNS,
            id: 'id_maybe_need_to_decrease'
        })).toEqual(
            {
                ingredients: [{
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
                {
                    _id: "id_maybe_need_to_decrease",
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
                },
                {
                    _id: "id_maybe_need_to_decrease",
                    name: "name2",
                    type: "bun",
                    proteins: 111,
                    fat: 222,
                    carbohydrates: 333,
                    calories: 444,
                    price: 555,
                    image: "src_image2",
                    image_mobile: "src_image_mobile2",
                    image_large: "src_image_large2",
                    __v: 666,
                    count: 0,
                }]
            }
        )
    })
    it('should handle CLEAR_COUNTERS', () => {
        expect(getIngredientsReducer({
            ingredients: [
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
                },
                {
                    _id: "id2",
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
                },
                {
                    _id: "id3",
                    name: "name2",
                    type: "bun",
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
                }
            ],
        },{
            type: types.CLEAR_COUNTERS,
            id: 'id_maybe_need_to_decrease'
        })).toEqual(
            {
                ingredients: [{
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
                    count: 0,
                },
                {
                    _id: "id2",
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
                    count: 0,
                },
                {
                    _id: "id3",
                    name: "name2",
                    type: "bun",
                    proteins: 111,
                    fat: 222,
                    carbohydrates: 333,
                    calories: 444,
                    price: 555,
                    image: "src_image2",
                    image_mobile: "src_image_mobile2",
                    image_large: "src_image_large2",
                    __v: 666,
                    count: 0,
                }]
            }
        )
    })

})