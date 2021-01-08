import React from 'react'

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ({ ingredients }) => {
	const dashArray = num => {
		const array = []
		for (let i = 0; i < num; i++) {
			array.push('-')
		}
		return array
	}

	let transformedIngredients = Object.keys(ingredients)
		.map(igKey => {
			return [
				...dashArray(ingredients[igKey]).map((_, index) => {
					return <BurgerIngredient key={igKey + index} type={igKey} />
				}),
			]
		})
		.flat()

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top' />
			{transformedIngredients}
			<BurgerIngredient type='bread-bottom' />
		</div>
	)
}

export default Burger
