import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: ''
});
const {
    text,
} = formData;  const onChange = e => 
  setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Post it up</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
        }}
      >
        <div>
          <h4>What kind of post is this?</h4><br/>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-lt-orange">
            <input type="radio" name="options" id="have" autocomplete="off" checked/> Have
          </label>
          <label class="btn btn-lt-green">
            <input type="radio" name="options" id="want" autocomplete="off"/> Want
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
          required
        ></textarea>
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
