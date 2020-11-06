import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addWants } from '../../actions/profile';

const AddWants = ({ addWants, history }) => {
    const [formData, setFormData] = useState({
        haves: ''
    });

    const { title, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Wants to your profile
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any stuff or services you typically look for
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addWants(formData,history);
            }}>
                <div className="form-group">
                <input type="text" placeholder="* Job Title" name="title"
                value={title} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    value={description} onChange={e => onChange(e)} 
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddWants.propTypes = {
    addHaves: PropTypes.func.isRequired
}

export default connect(null, { addWants })(withRouter(AddWants));
