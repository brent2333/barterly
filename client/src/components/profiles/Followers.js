import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getFollowers } from '../../actions/profile';
const Followers = ({ getFollowers, auth: { user }, profile: {profiles, loading} }) => {
    useEffect(() =>{
        getFollowers();
    }, [getFollowers]);

    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Followers</h1>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile}/>
                        ))
                    ) : <h4>No profiles found...</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Followers.propTypes = {
    getFollowers: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getFollowers })(Followers);
