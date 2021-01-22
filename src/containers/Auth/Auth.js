import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions'
import { checkValidity } from '../../shared/utility'

const Auth = props => {
	const [authForm, setAuthForm] = useState({
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
	})

	const [isSignUp, setIsSignup] = useState(true)

	const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props

	useEffect(() => {
		if (!buildingBurger && authRedirectPath !== '/') {
			onSetAuthRedirectPath()
		}
		return () => {}
	}, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...authForm,
			[controlName]: {
				...authForm[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, authForm[controlName].validation),
				touched: true,
			},
		}

		setAuthForm(updatedControls)
	}

	const submitHandler = event => {
		event.preventDefault()

		props.onAuth(authForm.email.value, authForm.password.value, isSignUp)
	}

	const switchAuthModeHandler = () => {
		setIsSignup(!isSignUp)
	}

	const formElementsArray = []
	for (const key in authForm) {
		formElementsArray.push({
			id: key,
			config: authForm[key],
		})
	}

	let form = formElementsArray.map(formEl => (
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
	))

	if (props.loading) {
		form = <Spinner />
	}
	let errorMessage = null
	if (props.error) {
		errorMessage = <p>{props.error.message}</p>
	}

	let authRedirect = null

	if (props.isAuth) {
		authRedirect = <Redirect to={props.authRedirectPath} />
	}

	return (
		<div className={classes.Auth}>
			{authRedirect}
			{errorMessage}
			<form onSubmit={submitHandler}>
				{form}
				<Button btnType='Success'>SUBMIT</Button>
			</form>
			<Button clicked={switchAuthModeHandler} btnType='Danger'>
				SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
			</Button>
		</div>
	)
}

const mapStateToProps = state => ({
	error: state.auth.error,
	loading: state.auth.loading,
	isAuth: state.auth.token !== null,
	buildingBurger: state.burgerBuilder.building,
	authRedirectPath: state.auth.authRedirectPath,
})

const mapDispatchToProps = dispatch => ({
	onAuth: (email, password, isSignUp) =>
		dispatch(actions.auth(email, password, isSignUp)),
	onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath((path = '/'))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
