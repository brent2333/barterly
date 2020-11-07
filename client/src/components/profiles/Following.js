import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getFollowing } from '../../actions/profile';
const Following = ({ getProfiles, auth: { user }, profile: {profiles, loading} }) => {
    useEffect(() =>{
        getFollowing();
    }, []);

    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Following</h1>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            profile.user._id !== user._id ? <ProfileItem key={profile._id} profile={profile}/> : ''
                        ))
                    ) : <h4>No profiles found...</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Following.propTypes = {
    getFollowing: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getFollowing })(Following);
