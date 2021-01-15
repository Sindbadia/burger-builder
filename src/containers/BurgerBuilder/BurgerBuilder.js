import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		// axios
		// 	.get('https://burger-builder-b8802-default-rtdb.firebaseio.com/ingredients.json')
		// 	.then(res => {
		// 		this.setState({ ingredients: res.data })
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error: true })
		// 	})
	}

	updatePurchaseState = () => {
		const purchasable = Object.values(this.props.ings).some(value => value > 0)
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
		const disabledInfo = { ...this.props.ings }
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

		if (this.props.ings) {
			burger = (
				<Fragment>
					<Burger ingredients={this.props.ings} />
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
					ingredients={this.props.ings}
					purchaseContinued={this.purchaseContinueHandler}
					purchaseCanceled={this.purchaseCancelHandler}
					price={this.props.price}
				/>
			)
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingName }),
		onIngredientRemoved: ingName =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingName }),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
