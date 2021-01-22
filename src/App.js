import React, { Suspense, lazy, useEffect } from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions'

const Checkout = lazy(() => import('./containers/Checkout/Checkout'))
const Orders = lazy(() => import('./containers/Orders/Orders'))
const Auth = lazy(() => import('./containers/Auth/Auth'))

const App = props => {
	useEffect(() => {
		props.onTryAutoSignup()
		return () => {}
	}, [])

	let routes = (
		<Switch>
			<Route path='/auth' component={Auth} />
			<Route path='/' exact component={BurgerBuilder} />
			<Redirect to='/' />
		</Switch>
	)
	if (props.isAuth) {
		routes = (
			<Switch>
				<Route path='/checkout' component={Checkout} />
				<Route path='/orders' component={Orders} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' component={Auth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to='/' />
			</Switch>
		)
	}

	return (
		<div>
			<Layout>
				<Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
			</Layout>
		</div>
	)
}

const mapStateToProps = state => ({
	isAuth: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
	onTryAutoSignup: () => dispatch(actions.authCheckState()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
