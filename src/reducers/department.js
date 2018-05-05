import { combineReducers } from 'redux'
import _ from 'lodash'
import {
    SELECT_DEPARTMENT,
    LOAD_DEPARTMENT_START,
    LOAD_DEPARTMENT_FINISHED,
    LOAD_DEPARTMENT_FAILED
} from '../action'

const intialState = {
    fetching: false,
    fetched: false,
    departments: [
    ],
    selected: "",
    error: null
}

function department(state = intialState, action) {
    switch (action.type) {
        case LOAD_DEPARTMENT_START:
            return {
                ...state,
                fetching: true,
            }
            break;
        case LOAD_DEPARTMENT_FINISHED:
            return {
                ...state,
                fetching: false,
                fetched: true,
                departments: action.payload
            }
            break;
        case LOAD_DEPARTMENT_FAILED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
            break;
        case SELECT_DEPARTMENT:
            return {
                ...state,
                fetching: false,
                selected: action.payload
            }
            break;
    }
    return state;
}

export function getPlatform(state, props) {
    var object = _.filter(state.department.departments, function(o) { return o.code == state.department.selected; });
    console.log(object);
    if (!_.isEmpty(object)) {
        return object[0].title;
    }
    return 'Shopping Cart'
}

export default department;