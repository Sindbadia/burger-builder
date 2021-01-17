import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData,
	}
}

export const purchaseBurgerFail = err => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		err,
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	}
}

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		axios
			.post(`/orders.json?auth=${token}`, orderData)
			.then(res => {
				dispatch(purchaseBurgerSuccess(res.data.name, orderData))
			})
			.catch(err => {
				dispatch(purchaseBurgerFail(err))
			})
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	}
}

export const fetchOrderSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders,
	}
}

export const fetchOrderFail = err => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		err,
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
		axios
			.get(`/orders.json${queryParams}`)
			.then(res => {
				const fetchedOrders = []
				for (let entry of Object.entries(res.data)) {
					fetchedOrders.push({ id: entry[0], ...entry[1] })
				}
				dispatch(fetchOrderSuccess(fetchedOrders))
			})
			.catch(err => {
				dispatch(fetchOrderFail(err))
			})
	}
}
