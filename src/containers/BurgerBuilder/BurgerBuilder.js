import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false)

	useEffect(() => {
		props.onInitIngredients()
		return () => {}
	}, [])

	const updatePurchaseState = () => {
		const purchasable = Object.values(props.ingredients).some(value => value > 0)
		return purchasable
	}

	const purchaseHandler = () => {
		if (props.isAuth) {
			setPurchasing(true)
		} else {
			props.onSetAuthRedirectPath('/checkout')
			props.history.push('/auth')
		}
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false)
	}

	const purchaseContinueHandler = () => {
		props.onInitPurchase()
		props.history.push('/checkout')
	}

	const disabledInfo = { ...props.ingredients }
	for (const key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}

	let orderSummary = null
	let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

	if (props.ingredients) {
		burger = (
			<Fragment>
				<Burger ingredients={props.ingredients} />
				<BuildControls
					ingredientAdded={props.onIngredientAdded}
					ingredientRemoved={props.onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState()}
					ordered={purchaseHandler}
					price={props.price}
					isAuth={props.isAuth}
				/>
			</Fragment>
		)
		orderSummary = (
			<OrderSummary
				ingredients={props.ingredients}
				purchaseContinued={purchaseContinueHandler}
				purchaseCanceled={purchaseCancelHandler}
				price={props.price}
			/>
		)
	}

	return (
		<Fragment>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</Fragment>
	)
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.token !== null,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
