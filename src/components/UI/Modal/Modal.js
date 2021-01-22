import React, { Fragment } from 'react'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.module.css'

const Modal = props => {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return (
	// 		nextProps.show !== this.props.show || nextProps.children !== this.props.children
	// 	)
	// }

	const { children, show, modalClosed } = props

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

export default React.memo(
	Modal,
	(prevProps, nextProps) =>
		prevProps.show === nextProps.show && nextProps.children === prevProps.children,
)
