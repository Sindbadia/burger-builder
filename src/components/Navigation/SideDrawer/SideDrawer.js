import React, { Fragment } from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

import classes from './SideDrawer.module.css'

const SideDrawer = ({ open, closed, isAuth }) => {
	let attachedClasses = [classes.SideDrawer, classes.Close]

	if (open) {
		attachedClasses = [classes.SideDrawer, classes.Open]
	}

	return (
		<Fragment>
			<Backdrop show={open} clicked={closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems isAuth={isAuth} clicked={closed} />
				</nav>
			</div>
		</Fragment>
	)
}

export default SideDrawer
