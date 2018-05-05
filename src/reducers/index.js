import {combineReducers} from 'redux'
import department from './department'
import modules from './module'
import cart from './cart'

const reducers = combineReducers({
    department,
    modules,
    cart
})

export default reducers;