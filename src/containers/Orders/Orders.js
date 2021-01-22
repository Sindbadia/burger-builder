import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions'

const Orders = props => {
	const { onFetchOrders, token, userId, loading, orders } = props

	useEffect(() => {
		onFetchOrders(token, userId)
		return () => {}
	}, [onFetchOrders, token, userId])

	let ordersOut = <Spinner />
	if (!loading) {
		ordersOut = orders.map(order => {
			return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
		})
	}

	return <div>{ordersOut}</div>
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(Orders, axios))
