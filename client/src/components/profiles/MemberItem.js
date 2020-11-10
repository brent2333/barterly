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
    profileImage,
    location,
    haves,
    wants
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
                    <div>
                        <h4 className="text-primary">Location</h4>
                    <p>
                        <span>{location.country ? location.country : ''}</span>{' '}
                        <span>{location.state ? location.state : ''}</span>{' '}
                        <span>{location.zip ? location.zip : ''}</span>
                    </p>
                    </div>
                )} 
                <p>{bio}</p><br></br>
                {
                    website ? (<p><i className="fas fa-globe"></i> <a href={website} target="_blank" rel="noreferrer">Website</a></p>) : ''
                }
            </div>
            <div>
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
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    addFollow: PropTypes.func.isRequired,
}

export default connect(null, {addFollow})(ProfileItem);
