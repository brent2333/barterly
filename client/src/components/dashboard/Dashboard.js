import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Haves from './Haves';
import Wants from './Wants';


const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? <Spinner /> :
    <div className="dashwrap">
        <h1 className="large text-primary">
            Dashboard
        </h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name }
        </p>
        {profile !== null ? 
        <Fragment>
        <div>
            <Link to={`/profile/${profile._id}`} className="btn btn-primary">
                View Profile
            </Link>
        </div>
            <DashboardActions/>
            <div>Following <Link to="/following" >{profile.following.length}</Link></div>
            <div>Followers <Link to="/followers" >{profile.followers.length}</Link></div>
            <Haves haves={profile.haves} />
            <Wants wants={profile.wants} />
            <div className="ny-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i>{' '}Delete My Account
                </button>
            </div>
        </Fragment> : 
        <Fragment>
            <p>You have not yet setup a profile. Please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
            </Link>
            </Fragment>
        }
    </div>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
