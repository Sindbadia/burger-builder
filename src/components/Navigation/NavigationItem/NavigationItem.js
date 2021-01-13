import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavigationItem = ({ link, children, exact }) => {
	return (
		<li className={classes.NavigationItem}>
			<NavLink to={link} exact={exact} activeClassName={classes.active}>
				{children}
			</NavLink>
		</li>
	)
}

export default NavigationItem
