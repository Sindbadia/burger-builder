import React, { Fragment, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

	const dispatch = useDispatch()

	const ingredients = useSelector(state => state.burgerBuilder.ingredients)
	const price = useSelector(state => state.burgerBuilder.totalPrice)
	const error = useSelector(state => state.burgerBuilder.error)
	const isAuth = useSelector(state => state.auth.token !== null)

	const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName))
	const onIngredientRemoved = ingName => dispatch(actions.removeIngredient(ingName))
	const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [])
	const onInitPurchase = () => dispatch(actions.purchaseInit())
	const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

	useEffect(() => {
		onInitIngredients()
		return () => {}
	}, [onInitIngredients])

	const updatePurchaseState = () => {
		const purchasable = Object.values(ingredients).some(value => value > 0)
		return purchasable
	}

	const purchaseHandler = () => {
		if (isAuth) {
			setPurchasing(true)
		} else {
			onSetAuthRedirectPath('/checkout')
			props.history.push('/auth')
		}
	}

	const purchaseCancelHandler = () => {
		setPurchasing(false)
	}

	const purchaseContinueHandler = () => {
		onInitPurchase()
		props.history.push('/checkout')
	}

	const disabledInfo = { ...ingredients }
	for (const key in disabledInfo) {
		disabledInfo[key] = disabledInfo[key] <= 0
	}

	let orderSummary = null
	let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />

	if (ingredients) {
		burger = (
			<Fragment>
				<Burger ingredients={ingredients} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					disabled={disabledInfo}
					purchasable={updatePurchaseState()}
					ordered={purchaseHandler}
					price={price}
					isAuth={isAuth}
				/>
			</Fragment>
		)
		orderSummary = (
			<OrderSummary
				ingredients={ingredients}
				purchaseContinued={purchaseContinueHandler}
				purchaseCanceled={purchaseCancelHandler}
				price={price}
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

export default withErrorHandler(BurgerBuilder, axios)
