import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLocation } from '../../actions/profile';

const AddLocation = ({ addLocation, history }) => {
    const [formData, setFormData] = useState({
        country: '',
        zip: '',
        city: '',
        state: ''
    });

    const { country, zip, city, state } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Your Location
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Members will want to know where you are located
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addLocation(formData,history);
            }}>
                <div className="form-group">
                <input type="text" placeholder="* Country" name="country"
                value={country} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Zip Code" name="zip"
                value={zip} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="City" name="city"
                value={city} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" name="state"
                value={state} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <input type="text" name="state"
                value={state} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    )
}

AddLocation.propTypes = {
    addLocation: PropTypes.func.isRequired
}

export default connect(null, { addLocation })(withRouter(AddLocation));
