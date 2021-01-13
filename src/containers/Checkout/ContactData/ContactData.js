import React, { Component } from 'react'
import axios from '../../../axios-orders'

import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

export default class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	}

	orderHandler = async event => {
		event.preventDefault()

		this.setState({ loading: true })
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
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
		this.setState({ loading: false })
		this.props.history.replace('/')
	}

	render() {
		let form = (
			<form>
				<input
					className={classes.Input}
					type='text'
					name='name'
					placeholder='Your Name'
				/>
				<input
					className={classes.Input}
					type='email'
					name='email'
					placeholder='Your Email'
				/>
				<input
					className={classes.Input}
					type='text'
					name='address'
					placeholder='Street'
				/>
				<input
					className={classes.Input}
					type='text'
					name='address'
					placeholder='Postal Code'
				/>
				<Button btnType='Success' clicked={this.orderHandler}>
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
