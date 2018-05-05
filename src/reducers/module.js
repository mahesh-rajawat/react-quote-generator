import { combineReducers } from 'redux'
import {
    LOAD_MODULE_START,
    LOAD_MODULE_FINISHED,
    LOAD_MODULE_FAILED
} from '../action'

const intialState = {
    fetching: false,
    fetched: false,
    items: [
    ],
    error: null
}

function modules(state = intialState, action) {
    switch (action.type) {
        case LOAD_MODULE_START:
            return {
                ...state,
                fetching: true,
            }
            break;
        case LOAD_MODULE_FINISHED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                items: action.payload
            }
            break;
        case LOAD_MODULE_FAILED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
    }
    return state;
}

export default modules;