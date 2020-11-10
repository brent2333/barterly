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
    profileImage,
    haves,
    wants,
    location
}}) => {
    return (
        <div className="profile bg-light">
            <div>
            {
               profileImage ? (<img src={profileImage} height="200" alt="" className="round-img"/>) : ''
            }
            </div>
            <div>
                <h2>{user.name}</h2>
                {location && (
                    <p>
                        <span>{location.country ? location.country : ''}</span>{' '}
                        <span>{location.state ? location.state : ''}</span>{' '}
                        <span>{location.zip ? location.zip : ''}</span>
                    </p>
                )} 
                <p>{bio}</p><br></br>
                {
                    website ? (<p><a href={website} target="_blank" rel="noreferrer">Website</a></p>) : ''
                }
                <div>
                {haves.length > 0 ? <h4 className="text-primary">Haves</h4> : ''}
                    {haves && haves.map(have => (
                            <p>{have.description}</p>
                    ))}
                </div>
                <div>
                {wants.length > 0 ? <h4 className="text-primary">Wants</h4> : ''}
                    {wants && wants.map(want => (
                            <p>{want.description}</p>
                    ))}
                </div>
         
            </div>
            <div className="profile-item-buttons">
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
                <Link to={`userposts/${_id}`} className="btn btn-primary">
                    View Posts
                </Link>  
            </div>
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
