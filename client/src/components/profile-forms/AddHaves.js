import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addHaves } from '../../actions/profile';

const AddHaves = ({ addHaves, history }) => {
    const [formData, setFormData] = useState({
        haves: ''
    });

    const { title, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Haves to your profile
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any stuff or services you have to offer
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addHaves(formData,history);
            }}>
                <div className="form-group">
                <input type="text" placeholder="* Title" name="title"
                value={title} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Description"
                    value={description} onChange={e => onChange(e)} 
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddHaves.propTypes = {
    addHaves: PropTypes.func.isRequired
}

export default connect(null, { addHaves })(withRouter(AddHaves));
