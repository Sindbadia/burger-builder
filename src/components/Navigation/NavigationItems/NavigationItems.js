import React from 'react'

import classes from './NavigationItems.module.css'
import NavigationItem from '../NavigationItem/NavigationItem'

const NavigationItems = ({ isAuth, clicked }) => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link='/' exact clicked={clicked}>
			Burger Builder
		</NavigationItem>
		{isAuth ? (
			<NavigationItem link='/orders' clicked={clicked}>
				Orders
			</NavigationItem>
		) : null}
		{!isAuth ? (
			<NavigationItem link='/auth' clicked={clicked}>
				Authenticate
			</NavigationItem>
		) : (
			<NavigationItem link='/logout' clicked={clicked}>
				Logout
			</NavigationItem>
		)}
	</ul>
)

export default NavigationItems
