import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFollow } from '../../actions/profile'; 

const ProfileItem = ({ addFollow, profile: {
    user,
    _id,
    website,
    bio,
    profileImage
}}) => {
    return (
        <div className="profile bg-light">
            {
               profileImage ? (<img src={`/files/${profileImage}`} height="200" alt="" className="round-img"/>) : ''
            }
            
            <div>
                <h2>{user.name}</h2>
                <p>{bio}</p>
                {
                    website ? (<p><a href={website} target="_blank" rel="noreferrer">Website</a></p>) : ''
                }
                {/* <p className="my-1">{location && <span>{location}</span>}</p> */}
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
                <Link to={`userposts/${_id}`} className="btn btn-primary">
                    View Posts
                </Link>
            </div>
            <ul>
                {/* {skills.slice(0,4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))} */}
            </ul>
            <button 
                className="btn btn-primary"
                onClick={(e) => addFollow(_id)}
                >
                <i className="fas fa-user-plus"></i> Follow
            </button>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    addFollow: PropTypes.func.isRequired,
}

export default connect(null, {addFollow})(ProfileItem);
