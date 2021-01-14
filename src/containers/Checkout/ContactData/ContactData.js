import React, { Component } from 'react'
import axios from '../../../axios-orders'

import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
	state = {
		orderForm: {
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
				value: '',
				validation: {},
				valid: true,
			},
		},
		formIsValid: false,
		loading: false,
	}

	orderHandler = async event => {
		event.preventDefault()

		this.setState({ loading: true })

		const formData = {}
		for (const formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}

		const res = await axios.post('/orders.json', order)
		console.log(res)
		this.setState({ loading: false })
		this.props.history.replace('/')
	}

	checkValidity(value, rules) {
		let isValid = true

		// if (!rules) {
		// 	return true
		// }

		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}

		return isValid
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm))

		updatedOrderForm[inputIdentifier].value = event.target.value
		updatedOrderForm[inputIdentifier].valid = this.checkValidity(
			updatedOrderForm[inputIdentifier].value,
			updatedOrderForm[inputIdentifier].validation,
		)
		updatedOrderForm[inputIdentifier].touched = true

		let formIsValid = true
		for (const inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		console.log('formIsValid :>> ', formIsValid)

		this.setState({ orderForm: updatedOrderForm, formIsValid })
	}

	render() {
		const formElementsArray = []
		for (const key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formEl => (
					<Input
						key={formEl.id}
						elementType={formEl.config.elementType}
						elementConfig={formEl.config.elementConfig}
						value={formEl.config.value}
						invalid={!formEl.config.valid}
						shouldValidate={formEl.config.validation}
						touched={formEl.config.touched}
						changed={event => this.inputChangedHandler(event, formEl.id)}
					/>
				))}
				<Button btnType='Success' disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		)

		if (this.state.loading) {
			form = <Spinner />
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData