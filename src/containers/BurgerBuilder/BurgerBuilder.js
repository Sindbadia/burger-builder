import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Burger from '../../components/Burger/Burger'
import axios from '../../axios-orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients()
	}

	updatePurchaseState = () => {
		const purchasable = Object.values(this.props.ingredients).some(
			value => value > 0,
		)
		return purchasable
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = { ...this.props.ingredients }
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		)

		if (this.props.ingredients) {
			burger = (
				<Fragment>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState()}
						ordered={this.purchaseHandler}
						price={this.props.price}
					/>
				</Fragment>
			)
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseContinued={this.purchaseContinueHandler}
					purchaseCanceled={this.purchaseCancelHandler}
					price={this.props.price}
				/>
			)
		}

		return (
			<Fragment>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		price: state.totalPrice,
		error: state.error,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: ingName =>
			dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () =>
			dispatch(burgerBuilderActions.initIngredients()),
		onFetchIngredientsFailed: () =>
			dispatch(burgerBuilderActions.fetchIngredientsFailed()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
