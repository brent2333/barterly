import React, { Fragment, useState } from 'react';
import countries from '../../utils/countries';
import states from  '../../utils/states';
const RegionForm = ({addServiceArea}) => {
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        proximity: ''
    });
    
    const {
        country,
        state,
        proximity
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <div id="region_selection_list">
            <div id="location_root_region_select">
            <label>Country</label>
            <select name="country" 
                onChange={(e) => onChange(e)}>
            <option></option>
            { countries.map(country => (
                <option value={country.code} key={country.code}>{country.name}</option>
            ))}
            </select>
            </div>
            <div className={country === 'US' ? 'show' : 'hide'}>
            <label>State</label>
            <select name="state"
            onChange={(e) => onChange(e)}>
            <option></option>
            { states.map(state => (
                <option value={state.abbreviation} key={state.abbreviation}>{state.name}</option>
            ))}
            </select>
            <label htmlFor="proximity">Within</label>
            <select id="proximity" name="proximity"
            onChange={(e) => onChange(e)}>
            <option value=""></option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="500">500</option>
            </select>
            miles from my location (for information only, see profile)<br/>
                </div>
                </div>
                <button className="btn btn-primary my-1"
                onClick={(e) => {
                    addServiceArea(e, formData);
                }}>Add Service Area</button>
    </Fragment>
    );
}

export default RegionForm;