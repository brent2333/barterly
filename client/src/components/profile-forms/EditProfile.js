import React, { useState, useEffect, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile,  getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        website: '',
        bio: '',
    });
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            bio: loading || !profile.bio ? '' : profile.bio,
            website: loading || !profile.website ? '' : profile.website,
        });
    },[])
    const {
        website,
        bio
    } = formData;
    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Edit Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get this just right
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                <small className="form-text">* Tell us a little about yourself</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="a website link (optional)" name="website" value={website} onChange={e => onChange(e)} />
                <small className="form-text"
                    >Could be your own or a company website</small
                >
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
    </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
