import React from 'react'

import classes from './Button.module.css'

const Button = ({ btnType, clicked, disabled, children }) => {
	return (
		<button
			className={[classes.Button, classes[btnType]].join(' ')}
			onClick={clicked}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default Button
