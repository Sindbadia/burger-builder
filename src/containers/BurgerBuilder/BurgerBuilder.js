import React, { Component, Fragment } from 'react'
import axios from '../../axios-orders'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	}

	componentDidMount() {
		axios
			.get('https://burger-builder-b8802-default-rtdb.firebaseio.com/ingredients.json')
			.then(res => {
				this.setState({ ingredients: res.data })
			})
			.catch(error => {
				this.setState({ error: true })
			})
	}

	updatePurchaseState = ingredients => {
		const isPurchasable = Object.values(ingredients).some(value => value > 0)
		this.setState({ purchasable: isPurchasable })
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type]
		const updatedCount = oldCount + 1
		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[type] = updatedCount

		const priceAddition = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice + priceAddition

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })

		this.updatePurchaseState(updatedIngredients)
	}

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type]
		if (oldCount <= 0) {
			return
		}
		const updatedCount = oldCount - 1
		const updatedIngredients = { ...this.state.ingredients }
		updatedIngredients[type] = updatedCount

		const priceDeduction = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice
		const newPrice = oldPrice - priceDeduction

		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })

		this.updatePurchaseState(updatedIngredients)
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}
	purchaseContinueHandler = async () => {
		// alert('You Continue!')
		this.setState({ loading: true })
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Test',
				address: {
					street: 'Test Street',
					zipCode: '123456',
					country: 'Germany',
				},
				email: 'test@test.com',
				deliveryMethod: 'fastest',
			},
		}

		const res = await axios.post('/orders.json', order)
		console.log(res)
		this.setState({ loading: false, purchasing: false })
	}

	render() {
		const disabledInfo = { ...this.state.ingredients }
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

		if (this.state.ingredients) {
			burger = (
				<Fragment>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientRemoved={this.removeIngredientHandler}
						ingredientAdded={this.addIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</Fragment>
			)
			orderSummary = (
				<OrderSummary
					ingredients={this.state.ingredients}
					purchaseContinued={this.purchaseContinueHandler}
					purchaseCanceled={this.purchaseCancelHandler}
					price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)
