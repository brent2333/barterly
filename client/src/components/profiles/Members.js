import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MemberItem from './MemberItem';
import { getProfiles } from '../../actions/profile';
const Members = ({ getProfiles, auth: { user }, profile: {profiles, loading} }) => {
    useEffect(() =>{
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            { loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Members</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"/>
                    {' '}Members can browse and connect
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <MemberItem key={profile._id} profile={profile}/>
                        ))
                    ) : <h4>No profiles found...</h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Members.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Members);
