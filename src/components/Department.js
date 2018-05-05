import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchDepartment, selectDepartment} from '../action'
import { SyncLoader } from 'react-spinners';

class Department extends Component {

    componentDidMount () {
        this.props.fetchDepartment()
    }

    selectDepartment (e) {
        if (e.target.value) {
            this.props.selectDepartment(e.target.value);
        }
    }

    createDepartmentList () {
        return (
            <div className="form-group">
                <select  onChange={this.selectDepartment.bind(this)} className="form-control">
                <option value="" key="0" >Select...</option>
                {this.props.departments.map(option => {
                    return <option value={option.code} key={option.id} >{option.title}</option>
                })}
                </select>
            </div>
          )
        // return this.props.departments.map((department) => {
        //     return (
        //         <option>1</option>
        //         // <div key={department.id} className="col-lg-3">
        //         //     <input type="radio" id={department.id} name="select" value="1" onChange={() => this.selectDepartment(department)} />
        //         //     <label htmlFor={department.id}>
        //         //         <p>{department.title}</p>
        //         //     </label>
        //         // </div>    
        //     )
        // })
    }
    render() {
        if (this.props.fetching) {
            return (
                <div className="department">
                    <h3 className="heading">Choose your platform</h3>
                    <SyncLoader
                    color={'#123abc'} 
                    loading={true} 
                    />
                </div>
            )
        } else if (this.props.fetched) {
            return (
                <section className="department">
                    <h3 className="heading">Choose Platform</h3>
                    {this.createDepartmentList()}
                </section>
            )
        } else {
            return (<div className="department"></div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        departments: state.department.departments,
        fetching: state.department.fetching,
        fetched: state.department.fetched
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchDepartment, selectDepartment}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Department);
