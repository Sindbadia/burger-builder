import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://burger-builder-b8802-default-rtdb.firebaseio.com',
})

export default instance
