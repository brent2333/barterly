import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    website,
    profileImage,
    location,
    user: { name }
  }
}) => {
  return (
    <div className="profile-top p-2">
      <img className="round-img my-1" height="200" src={profileImage} alt="" />
      <h1 className="large">{name}</h1>
      {location && (
      <p className="lead">
        <span>{location.country ? location.country : ''}</span>{' '}
        <span>{location.state ? location.state : ''}</span>{' '}
        <span>{location.zip ? location.zip : ''}</span>
      </p>
      )}
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
