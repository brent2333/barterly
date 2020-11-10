import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteFollow } from '../../actions/profile'; 

const ProfileItem = ({ deleteFollow, profile: {
    user,
    _id,
    website,
    bio,
    profileImage
}}) => {
    return (
        <div className="profile bg-light">
            <div>
            {
               profileImage ? (<img src={`/files/${profileImage}`} height="200" alt="" className="round-img"/>) : ''
            }
            </div>
            <div>
                <h2>{user.name}</h2>
                <p>{bio}</p>
                {
                    website ? (<p><a href={website} target="_blank" rel="noreferrer">Website</a></p>) : ''
                }
                {/* <p className="my-1">{location && <span>{location}</span>}</p> */}
                <Link to={`/profile/${user._id}`} className="btn btn-primary">
                    View Profile
                </Link>
                <Link to={`userposts/${_id}`} className="btn btn-primary">
                    View Posts
                </Link>
            </div>
            <ul>
            </ul>
            <button 
                className="btn btn-danger"
                onClick={(e) => deleteFollow(_id)}
                >
                <i className="fas fa-user-minus"></i> Unfollow
            </button>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    deleteFollow: PropTypes.func.isRequired,
}

export default connect(null, {deleteFollow})(ProfileItem);
