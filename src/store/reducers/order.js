import * as actionTypes from '../actions/actionTypes'
import { updateObjects } from './utility'

const initialState = {
	orders: [],
	laoding: false,
	purchased: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return updateObjects(state, { purchased: false })

		case actionTypes.PURCHASE_BURGER_START:
			return updateObjects(state, { loading: true })

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = { ...action.orderData, id: action.orderId }
			return updateObjects(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true,
			})

		case actionTypes.PURCHASE_BURGER_FAIL:
			return updateObjects(state, { loading: false })

		case actionTypes.FETCH_ORDERS_START:
			return updateObjects(state, { loading: true })

		case actionTypes.FETCH_ORDERS_SUCCESS:
			return updateObjects(state, {
				orders: [...action.orders],
				loading: false,
			})

		case actionTypes.FETCH_ORDERS_FAIL:
			return updateObjects(state, { loading: false })

		default:
			return state
	}
}

export default reducer
