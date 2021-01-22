import React, { useState } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'

import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions'
import { checkValidity } from '../../../shared/utility'

const ContactData = props => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your name',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'ZIP Code',
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
			},
			valid: false,
			touched: false,
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Your E-mail',
			},
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' },
				],
			},
			value: 'fastest',
			validation: {},
			valid: true,
		},
	})

	const [formIsValid, setFormIsValid] = useState(false)

	const orderHandler = async event => {
		event.preventDefault()

		const formData = {}
		for (const formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId,
		}

		props.onOrderBurger(order, props.token)
	}

	const inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = JSON.parse(JSON.stringify(orderForm))

		updatedOrderForm[inputIdentifier].value = event.target.value
		updatedOrderForm[inputIdentifier].valid = checkValidity(
			updatedOrderForm[inputIdentifier].value,
			updatedOrderForm[inputIdentifier].validation,
		)
		updatedOrderForm[inputIdentifier].touched = true

		let formIsValid = true
		for (const inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}

		setOrderForm(updatedOrderForm)
		setFormIsValid(formIsValid)
	}

	const formElementsArray = []
	for (const key in orderForm) {
		formElementsArray.push({
			id: key,
			config: orderForm[key],
		})
	}

	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formEl => (
				<Input
					key={formEl.id}
					elementType={formEl.config.elementType}
					elementConfig={formEl.config.elementConfig}
					value={formEl.config.value}
					invalid={!formEl.config.valid}
					shouldValidate={formEl.config.validation}
					touched={formEl.config.touched}
					changed={event => inputChangedHandler(event, formEl.id)}
				/>
			))}
			<Button btnType='Success' disabled={!formIsValid}>
				ORDER
			</Button>
		</form>
	)

	if (props.loading) {
		form = <Spinner />
	}

	return (
		<div className={classes.ContactData}>
			<h4>Enter your Contact Data</h4>
			{form}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withErrorHandler(ContactData, axios))
