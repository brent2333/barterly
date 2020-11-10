import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProfileLocation } from '../../actions/profile';
import countries from '../../utils/countries';
import states from  '../../utils/states';

const AddProfileLocation = ({ addProfileLocation, history }) => {
        const [formData, setFormData] = useState({
            country: '',
            state: '',
            city: '',
            zip: ''
        });
        
        const {
            country,
            state,
            city,
            zip       
        } = formData;
    const [showRegion, openRegionForm] = useState(false);
    const openRegion = () => openRegionForm(showRegion => true);
    const closeRegion = () => openRegionForm(showRegion => false);
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onArea = e => {
    if (e.target.id === 'mylocation') {
        setFormData({ ...formData, area: 'My Location (see profile)' });
    } else {
        setFormData({ ...formData, area: e.target.id.toUpperCase() })
    }
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
            Add Location to your profile
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any stuff or services you typically look for
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addProfileLocation(formData,history);
            }}>
        <div className="form-group">
          <h4>Service Area (optional)</h4>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-lt-green">
              <input type="radio" name="area" id="regional"
              onChange={(e) => onArea(e)}
              onClick={openRegion}/> Regional
            </label>
            <label className="btn btn-lt-orange">
              <input type="radio" name="area" id="mylocation"
              onChange={(e) => onArea(e)}
              onClick={closeRegion}
              /> At My Location
            </label>
            <label className="btn btn-lt-yellow">
              <input type="radio" name="area" id="worldwide"
              onChange={(e) => onArea(e)}
              onClick={closeRegion}/> Wordlwide
            </label>
          </div>
          <div className={showRegion ? 'show' : 'hide'}>
          <div id="region_selection_list">
            <div id="location_root_region_select">
            <label>Country</label>
            <select name="country" 
                onChange={(e) => onChange(e)}>
            <option></option>
            { countries.map(country => (
                <option value={country.name} key={country.code}>{country.name}</option>
            ))}
            </select>
            </div>
            <div className={country === 'United States' ? 'show' : 'hide'}>
            <label>State</label>
            <select name="state"
            onChange={(e) => onChange(e)}>
            <option></option>
            { states.map(state => (
                <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
            ))}
            </select>
            <label htmlFor="zip">Zip Code</label>
            <input type="text" placeholder="zip code" name="zip" value={zip} onChange={e => onChange(e)} />

            miles from my location (for information only, see profile)<br/>
                </div>
                </div>
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
            </form>
        </Fragment>
    )
}

AddProfileLocation.propTypes = {
    addProfileLocation: PropTypes.func.isRequired
}

export default connect(null, { addProfileLocation })(withRouter(AddProfileLocation));
