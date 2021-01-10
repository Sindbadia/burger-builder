import React, { Fragment, Component } from 'react'
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.module.css'

class Modal extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.show !== this.props.show || nextProps.children !== this.props.children
		)
	}

	componentDidUpdate() {
		// console.log('[Modal] DidUpdate')
	}

	render() {
		const { children, show, modalClosed } = this.props

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
}

export default Modal
