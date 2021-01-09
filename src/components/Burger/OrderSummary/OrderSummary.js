import React, { Component, Fragment } from 'react'

import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
	// This could be a functional component
	// componentDidUpdate(prevProps, prevState) {
	// 	console.log('[OrderSummary] DidUpdate')
	// }

	render() {
		const { ingredients, price, purchaseContinued, purchaseCanceled } = this.props

		const ingredientSummary = Object.entries(ingredients).map(ig => {
			return (
				<li key={ig[0]}>
					<span style={{ textTransform: 'capitalize' }}>{ig[0]}</span>: {ig[1]}
				</li>
			)
		})

		return (
			<Fragment>
				<h3>Your Order</h3>
				<p>A delicious burger with following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total Price: {price.toFixed(2)}</strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button clicked={purchaseCanceled} btnType='Danger'>
					CANCEL
				</Button>
				<Button clicked={purchaseContinued} btnType='Success'>
					CONTINUE
				</Button>
			</Fragment>
		)
	}
}

export default OrderSummary
