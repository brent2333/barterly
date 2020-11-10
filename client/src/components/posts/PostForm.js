import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import countries from '../../utils/countries';
import states from  '../../utils/states';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: '',
    category: '',
    kind: '',
    area: '',
    country: '',
    state: '',
    proximity: ''
});

const {
    text,
    category,
    kind,
    area,
    country,
    state,
    proximity

} = formData;
const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
const onCheck = e => setFormData({ ...formData, [e.target.name]: e.target.id });
const onArea = e => {
  if (e.target.id === 'mylocation') {
    setFormData({ ...formData, area: 'My Location (see profile)' });
  } else {
    setFormData({ ...formData, area: e.target.id.toUpperCase() })
  }
}
const [showRegion, openRegionForm] = useState(false);
const openRegion = () => openRegionForm(showRegion => true);
const closeRegion = () => openRegionForm(showRegion => false);

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Post it up</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text, category, kind, country, state, proximity, area });
        }}
      >
        <div className="form-group">
          <h4>What kind of post is this?</h4>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-lt-orange">
            <input type="radio" name="kind" id="have"
            onChange={(e) => onCheck(e)}/> Have
          </label>
          <label className="btn btn-lt-green">
            <input type="radio" name="kind" id="want"
            onChange={(e) => onCheck(e)}/> Want
          </label>
        </div>
        </div>
        <div className="form-group">
          <h4>Is this a good or service?</h4>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-lt-orange">
            <input type="radio" name="category" id="good"
            onChange={(e) => onCheck(e)}/> Good(s)
          </label>
          <label className="btn btn-lt-green">
            <input type="radio" name="category" id="service"
            onChange={(e) => onCheck(e)}/> Service(s)
          </label>
        </div>
        </div>
        <div className="form-group">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="your post here"
          value={text}
          onChange={(e) => onChange(e)}
        ></textarea>
        </div>
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
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
