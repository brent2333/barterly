import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegionForm  from './RegionForm';
import { addPost } from '../../actions/post';

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
const [showRegion, openRegionForm] = useState(false);
const openRegion = () => openRegionForm(showRegion => true);
const closeRegion = () => openRegionForm(showRegion => false);
const addServiceArea = (e, data) => {
  e.preventDefault();
  for (const d in data) {
    switch(d) {
      case 'country':
        formData.country = data[d];
      break;
      case 'state':
        formData.state = data[d];
      break;
      case 'proximity':
        formData.proximity = data[d];
      break;
      default:
      break;
    }
  }
}

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
              onChange={(e) => onCheck(e)}
              onClick={openRegion}/> Regional
            </label>
            <label className="btn btn-lt-orange">
              <input type="radio" name="area" id="mylocation"
              onChange={(e) => onCheck(e)}
              onClick={closeRegion}
              /> At My Location
            </label>
            <label className="btn btn-lt-yellow">
              <input type="radio" name="area" id="worldwide"
              onChange={(e) => onCheck(e)}
              onClick={closeRegion}/> Wordlwide
            </label>
          </div>
          <div className={showRegion ? 'show' : 'hide'}>
            <RegionForm addServiceArea={addServiceArea} />
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
