import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions'

class Logout extends Component {
	componentDidMount() {
		this.props.onLogout()
	}
	render() {
		return <Redirect to='/' />
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
