import React from 'react'

import classes from './BurgerControls.module.css'
import BurgerControl from './BurgerControl/BurgerControl'

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
]

const burgerControls = () => {
	return (
		<div className={classes.BuildControls}>
			{controls.map(ctrl => (
				<BurgerControl key={ctrl.label} label={ctrl.label} />
			))}
		</div>
	)
}

export default burgerControls
