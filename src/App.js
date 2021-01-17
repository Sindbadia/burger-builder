import React, { Component, Suspense, lazy } from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const asyncCheckout = lazy(() => import('./containers/Checkout/Checkout'))
const asyncOrders = lazy(() => import('./containers/Orders/Orders'))
const asyncAuth = lazy(() => import('./containers/Auth/Auth'))

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup()
	}

	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={asyncAuth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		)
		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/orders' component={asyncOrders} />
					<Route path='/logout' component={Logout} />
					<Route path='/auth' component={asyncAuth} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to='/' />
				</Switch>
			)
		}

		return (
			<div>
				<Suspense fallback={<div>Loading...</div>}>
					<Layout>{routes}</Layout>
				</Suspense>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
	onTryAutoSignup: () => dispatch(actions.authCheckState()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
