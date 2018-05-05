import {
    SAVE_PRODUCT
} from '../action'

const intialState = {
    items: []
}

function save(state = intialState, action) {
    switch (action.type) {
        case SAVE_PRODUCT:
            return {
                ...state,
                fetching: false,
                fetched: true,
                items: action.payload
            }
            break;
    }
    return state;
}

export default save;