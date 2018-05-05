import React, { Component } from 'react'
import {addToCart, removeFromCart} from '../action'
import {connect} from 'react-redux'
import { getItems, getCurrency, getTotal } from '../reducers/cart';
import { getPlatform } from '../reducers/department';
import CartItem from './CartItem';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';
import '../Cart.css'

const Cart = ({ items, total, currency, platform, removeFromCart }) => {
    return (
        <div>
            <h2 className="cart-heading">{platform}</h2>
            <div className="cart">
                <div className="panel panel-default">
                    <div className="panel-body">
                        {items.length > 0 && (
                            <div className="cart__body">
                                {items.map(item => (
                                    <CartItem key={item.id} {...item} onClick={() => removeFromCart(item.id)} />
                                ))}
                            </div>
                        )}
                        {items.length === 0 && (
                            <div className="alert alert-info">Cart is empty</div>
                        )}
                        <div className="cart__total">Total: <Currency
                            quantity={total}
                            currency={currency}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Cart.propTypes = {
    items: PropTypes.array,
    total: PropTypes.number,
    currency: PropTypes.string,
    platform: PropTypes.string,
    removeFromCart: PropTypes.func.isRequired
}


const mapStateToProps = (state, props) => {
    return {
        items: getItems(state, props),
        currency: getCurrency(state, props),
        total: getTotal(state, props),
        platform: getPlatform(state, props),
    }
}

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (id) => dispatch(removeFromCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);