import React from 'react'

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const Logo = ({ height }) => (
	<div className={classes.Logo} style={{ height }}>
		<img src={burgerLogo} alt='MyBurger' />
	</div>
)

export default Logo
