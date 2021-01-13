import React, { Component } from 'react'
import axios from '../../axios-orders'

import Spinner from '../../components/UI/Spinner/Spinner'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
	state = {
		orders: [],
		loading: true,
	}

	componentDidMount() {
		axios
			.get('orders.json')
			.then(res => {
				const fetchedOrders = []
				for (let entry of Object.entries(res.data)) {
					fetchedOrders.push({ id: entry[0], ...entry[1] })
				}
				console.log('fetchedOrders :>> ', fetchedOrders)
				this.setState({ orders: fetchedOrders, loading: false })
			})
			.catch(err => {
				this.setState({ loading: false })
			})
	}

	render() {
		let orders = this.state.orders.map(order => {
			return <Order key={order.id} ingredients={order.ingredients} price={order.price} />
		})

		if (this.state.loading) {
			orders = <Spinner />
		}

		return <div>{orders}</div>
	}
}

export default withErrorHandler(Orders, axios)
