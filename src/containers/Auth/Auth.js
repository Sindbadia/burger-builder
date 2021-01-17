import React, { Component } from 'react'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'

export class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address',
				},
				value: '',
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password',
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
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

		if (rules.isEmail) {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/
			isValid = pattern.test(value) && isValid
		}

		return isValid
	}

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: this.checkValidity(
					event.target.value,
					this.state.controls[controlName].validation,
				),
				touched: true,
			},
		}
		this.setState({ controls: updatedControls })
	}

	render() {
		const formElementsArray = []
		for (const key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			})
		}

		const form = formElementsArray.map(formEl => (
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
		))

		return (
			<div className={classes.Auth}>
				<form>
					{form}
					<Button btnType='Success'>SUBMIT</Button>
				</form>
			</div>
		)
	}
}

export default Auth
