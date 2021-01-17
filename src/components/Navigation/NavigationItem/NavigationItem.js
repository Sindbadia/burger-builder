import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavigationItem = ({ link, children, exact, clicked }) => {
	return (
		<li className={classes.NavigationItem} onClick={clicked}>
			<NavLink to={link} exact={exact} activeClassName={classes.active}>
				{children}
			</NavLink>
		</li>
	)
}

export default NavigationItem
