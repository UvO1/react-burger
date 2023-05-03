import {viewIngredientDetails} from "./card";
import * as types from "../actions/card";

describe('todos reducer', () =>{
    it('should return the initial state', () =>{
        expect(viewIngredientDetails(undefined, {})).toEqual(
            {
                ingredient: null,
            }
        )
    });
    it('should handle VIEW_INGREDIENT_DETAILS', () => {
        expect(viewIngredientDetails([],{
            type: types.VIEW_INGREDIENT_DETAILS,
            ingredient: {
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
                count: 7
            }
        })).toEqual(
            {
                ingredient: {
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
                    count: 7
                }
            }
        )
        expect(viewIngredientDetails([],{
            type: types.VIEW_INGREDIENT_DETAILS,
            ingredient: null
        })).toEqual(
            {
                ingredient: null
            }
        )
    })
    it('should handle HIDE_INGREDIENT_DETAILS', () => {
        expect(viewIngredientDetails([],{
            type: types.HIDE_INGREDIENT_DETAILS,
            ingredient: {
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
                count: 7
            }
        })).toEqual(
            {
                ingredient: null
            }
        )
        expect(viewIngredientDetails([],{
            type: types.VIEW_INGREDIENT_DETAILS,
            ingredient: null
        })).toEqual(
            {
                ingredient: null
            }
        )
    })
});