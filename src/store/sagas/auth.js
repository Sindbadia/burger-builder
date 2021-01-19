import { delay } from 'redux-saga/effects'
import { put } from 'redux-saga/effects'
import axios from 'axios'

import * as actions from '../actions'

export function* logoutSaga(action) {
	yield localStorage.removeItem('token')
	yield localStorage.removeItem('expDate')

	yield put(actions.logoutSucceed)
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expTime * 1000)
	yield put(actions.logout())
}

export function* authUserSaga(action) {
	yield put(actions.authStart())

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true,
	}

	let url =
		'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw'

	if (!action.isSignUp) {
		url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw'
	}

	try {
		const res = yield axios.post(url, authData)
		const expDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000)
		yield localStorage.setItem('token', res.data.idToken)
		yield localStorage.setItem('expDate', expDate)

		yield put(actions.authSuccess(res.data.idToken, res.data.localId))
		yield put(actions.checkAuthTimeout(res.data.expiresIn))
	} catch (err) {
		yield put(actions.authFail(err.response.data.error))
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token')
	if (!token) {
		yield put(actions.logout())
	} else {
		const expDate = new Date(localStorage.getItem('expDate'))
		if (expDate > new Date()) {
			const res = yield axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw',
				{
					idToken: token,
				},
			)
			const userId = res.data.users[0].localId
			yield put(actions.authSuccess(token, userId))
			yield put(
				actions.checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000),
			)
		} else {
			yield put(actions.logout())
		}
	}
}
