import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingName: name,
	}
}

export const removeIngredient = name => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingName: name,
	}
}

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients,
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios
			.get(
				'https://burger-builder-b8802-default-rtdb.firebaseio.com/ingredients.json',
			)
			.then(res => {
				dispatch(setIngredients(res.data))
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			})
	}
}
