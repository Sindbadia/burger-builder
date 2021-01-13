import React from 'react'

import classes from './Order.module.css'

const Order = ({ ingredients, price }) => {
	const transformedIngredients = []

	for (const ingredientName in ingredients) {
		transformedIngredients.push({
			name: ingredientName,
			amount: ingredients[ingredientName],
		})
	}

	const ingredientOutput = transformedIngredients.map(ig => (
		<span
			style={{
				textTransform: 'capitalize',
				display: 'inline-block',
				padding: '5px',
				border: '1px solid #ccc',
				margin: '0 8px',
			}}
			key={ig.name}
		>
			{ig.name} ({ig.amount})
		</span>
	))

	return (
		<div className={classes.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>
				Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
			</p>
		</div>
	)
}

export default Order
