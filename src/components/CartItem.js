import React from 'react';
import PropTypes from 'prop-types';
import Currency from 'react-currency-formatter';

const CartItem = ({ title, price, currency, onClick }) => {
    return (
        <div className="cart-item">
            <div>
                {/* <button className="btn btn-danger btn-xs" onClick={onClick}>X</button> */}
                <span className="cart-item__name">{title}</span>
            </div>
            <div className="cart-item__price">
                <Currency
                    quantity={price}
                    currency={currency}
                    />
            </div>
        </div>
    );
}

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default CartItem;