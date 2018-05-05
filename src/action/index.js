import axios from 'axios'
import _ from 'lodash'

export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT'
export const LOAD_DEPARTMENT_START = 'LOAD_DEPARTMENT_START'
export const LOAD_DEPARTMENT_FINISHED = 'LOAD_DEPARTMENT_FINISHED'
export const LOAD_DEPARTMENT_FAILED = 'LOAD_DEPARTMENT_FAILED'

export const LOAD_MODULE_START = 'LOAD_MODULE_START'
export const LOAD_MODULE_FINISHED = 'LOAD_MODULE_FINISHED'
export const LOAD_MODULE_FAILED = 'LOAD_MODULE_FAILED'

export const CART_ADD = 'CART_ADD'
export const CART_REMOVE = 'CART_REMOVE'
export const CART_REFRESH = 'CART_REFRESH'

export const SAVE_PRODUCT = 'SAVE_PRODUCT'

function receiveDepartment(response) {
    return {
        type: LOAD_DEPARTMENT_FINISHED,
        payload: response
    }
}

//Department Action Creators
export function fetchDepartment() {
    return dispatch => {
        dispatch({type: LOAD_DEPARTMENT_START})
        return axios.get("https://jsonblob.com/api/jsonBlob/851d27c1-44c0-11e8-adbe-9f4cc35d7a36")
            .then((response) => {
                dispatch(receiveDepartment(response.data))
            }).catch ((err) => {
                dispatch({type: LOAD_DEPARTMENT_FAILED, payload: err})
            })
      }
}

export function selectDepartment(module) {
    return dispatch => {
        dispatch({type: SELECT_DEPARTMENT, payload: module})
        dispatch(fetchModules(module));
        dispatch(emptyCart());
    }
}

/**
 * Fetch Modules
 * @param {*} code 
 */
function fetchModules(code) {
    return dispatch => {
        dispatch({type: LOAD_MODULE_START})
        return axios.get("https://jsonblob.com/api/jsonBlob/26b3480f-44d0-11e8-adbe-dd11a2424ed8")
            .then((response) => {
                dispatch(receiveModules(response.data, code))
            }).catch ((err) => {
                dispatch({type: LOAD_MODULE_FAILED, payload: err})
            })
    }
}

function receiveModules(response, code) {
    var data; 
    _.forEach(response, function(value) {
        if(_.has(value, code)) {
            data = value[code];
        }
    })
    return {
        type: LOAD_MODULE_FINISHED,
        payload: data
    }
}

/** Manage Cart */

export function addToCart(productId) {
    return {
        type: CART_ADD,
        payload: {
            productId
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

export function emptyCart() {
    return {
        type: CART_REFRESH,
        payload: []
    }
}