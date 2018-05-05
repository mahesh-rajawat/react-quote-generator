import { combineReducers } from 'redux'

import {
    CART_ADD,
    CART_REMOVE,
    CART_REFRESH
} from '../action'

const initialState = {
    items: [],
    currency: 'USD'
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        case CART_REFRESH:
            return handleCartRefresh(state, action.payload);
        default:
            return state;
    }
}

function handleCartAdd(state, payload) {
    return {
        ...state,
        items: [ ...state.items, payload.productId ]
    };
}

function handleCartRemove(state, payload) {
    return {
        ...state,
        items: state.items.filter(id => id !== payload.productId)
    };
}

function handleCartRefresh(state, payload) {
    return {
        ...state,
        items: payload
    };
}

// selectors
export function isInCart(state, id) {
    return state.cart.items.indexOf(id) !== -1;
}

export function getItems(state, props) {
    return state.cart.items.map(id => getProduct(state, { id }));
}

export function getCurrency(state, props) {
    return state.cart.currency;
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        const item = getProduct(state, { id });
        return acc + item.price;
    }, 0);
}

// export default function products(state = []) {
//     return state; // nothing to do here, but we need products node in redux store
// }

// selectors
export function getProducts(state, props) {
    return state.modules.items;
}

export function getProduct(state, props) {
    return state.modules.items.find(item => item.id === props.id);
}
