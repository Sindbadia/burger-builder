import React, { Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.module.css'

const Modal = ({ children, show, modalClosed }) => {
	return (
		<Fragment>
			<Backdrop show={show} clicked={modalClosed} />
			<div
				style={{
					transform: show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: show ? '1' : '0',
				}}
				className={classes.Modal}
			>
				{children}
			</div>
		</Fragment>
	)
}

export default Modal
