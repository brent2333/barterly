import React from 'react';
import PropTypes from 'prop-types';

const ProfileHaves = ({
  have: { title, description }
}) => (
  <div>
    <h3 className="text-dark">{title}</h3>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileHaves.propTypes = {
  have: PropTypes.object.isRequired
};

export default ProfileHaves;