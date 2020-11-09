import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import FollowProfiles from './FollowProfiles';
import { getFollowing } from '../../actions/profile';
const Following = ({ getFollowing, auth: { user }, profile: {profiles, loading} }) => {
    useEffect(() =>{
        getFollowing();
    }, [getFollowing]);
    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Following</h1>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <FollowProfiles key={profile._id} profile={profile}/>
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
