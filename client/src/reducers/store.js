import { createStore } from 'redux'
import authReducer from './Auth/auth'

const store = createStore(authReducer)

export default store