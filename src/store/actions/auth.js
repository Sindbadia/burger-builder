import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token,
		userId,
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error,
	}
}

export const logout = () => {
	localStorage.removeItem('token')
	localStorage.removeItem('expDate')
	return {
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const checkAuthTimeout = expTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expTime * 1000)
	}
}

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart())
		const authData = {
			email,
			password,
			returnSecureToken: true,
		}
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw'

		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw'
		}

		axios
			.post(url, authData)
			.then(res => {
				const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
				localStorage.setItem('token', res.data.idToken)
				localStorage.setItem('expDate', expDate)

				dispatch(authSuccess(res.data.idToken, res.data.localId))
				dispatch(checkAuthTimeout(res.data.expiresIn))
			})
			.catch(err => {
				dispatch(authFail(err.response.data.error))
			})
	}
}

export const setAuthRedirectPath = path => ({
	type: actionTypes.SET_AUTH_REDIRECT_PATH,
	path,
})

export const authCheckState = () => {
	return async dispatch => {
		const token = localStorage.getItem('token')
		if (!token) {
			dispatch(logout())
		} else {
			const expDate = new Date(localStorage.getItem('expDate'))
			if (expDate > new Date()) {
				const res = await axios.post(
					'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCOSRTJoT3XIIne0yK6R3wP9ZxCZdyXEqw',
					{
						idToken: token,
					},
				)
				const userId = res.data.users[0].localId
				dispatch(authSuccess(token, userId))
				dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime()) / 1000))
			} else {
				dispatch(logout())
			}
		}
	}
}
