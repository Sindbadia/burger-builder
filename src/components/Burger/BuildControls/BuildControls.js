import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
]

const BuildControls = ({
	ingredientAdded,
	ingredientRemoved,
	disabled,
	purchasable,
	price,
	ordered,
}) => {
	return (
		<div className={classes.BuildControls}>
			<p>
				Current Price: <em>{price.toFixed(2)}</em>
			</p>
			{controls.map(ctrl => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => ingredientAdded(ctrl.type)}
					removed={() => ingredientRemoved(ctrl.type)}
					disabled={disabled[ctrl.type]}
				/>
			))}
			<button onClick={ordered} className={classes.OrderButton} disabled={!purchasable}>
				ORDER NOW
			</button>
		</div>
	)
}

export default BuildControls