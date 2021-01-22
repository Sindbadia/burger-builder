import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = props => {
	const { ingredients, price, purchaseContinued, purchaseCanceled } = props

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

export default OrderSummary
