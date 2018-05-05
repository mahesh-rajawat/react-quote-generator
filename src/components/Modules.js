import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {SyncLoader} from 'react-spinners'
import Currency from 'react-currency-formatter';
import {addToCart, removeFromCart} from '../action'
import {isInCart} from '../reducers/cart'

class Modules extends Component {

    selectModule(module) {
        if (this.props.isInCart(this.props.currentState, module.id)) {
            this.props.removeFromCart(module.id)
        } else {
            this.props.addToCart(module.id);
        }
    }

    createModuleList () {
        return this.props.modules.map((module) => {
            return (
                <div 
                    key={module.id} 
                    className="col-lg-3"
                    >
                        <div className="module-image">
                            <img src={module.image} />
                        </div>
                        <div class="pretty p-switch p-fill">
                            <input type="checkbox" id={module.id}  value="1" onChange={() => this.selectModule(module)} />
                            <div class="state">
                                <label></label>
                            </div>
                        </div>
                        <div className="info">
                            <p className="title"><strong>{module.title}</strong></p>
                            {/* <p className="desc">{module.desc}</p> */}
                            <span className="price-block">
                                <Currency
                                    quantity={module.price}
                                    currency="USD"
                                    />
                            </span>
                        </div>
                    </div>
            )
        })
    }
    render() {
        if (this.props.fetching) {
            return (
                <div className="module-wrapper col-lg-12">
					<div className="col-lg-12">
                        <div className="module">
                            <h3 className="heading">Choose your Module</h3>
                            <SyncLoader
                            color={'#123abc'} 
                            loading={true} 
                            />
                        </div>
                    </div>
                </div>
            )
        } else if (this.props.fetched) {
            return (
                <div className="module-wrapper col-lg-12">
					<div className="col-lg-12">
                        <div className="module">
                            <h3 className="heading">Choose your Module</h3>
                            {this.createModuleList()}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div className="module"></div>)
        }
    }
}

// function mapStateToProps(state) {
//     return {
        
//     }
// }
const mapStateToProps = (state, props) => {
    return {
        isInCart: isInCart,
        modules: state.modules.items,
        fetching: state.modules.fetching,
        fetched: state.modules.fetched,
        currentState: state
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addToCart, removeFromCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modules);