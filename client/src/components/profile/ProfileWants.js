import React from 'react';
import PropTypes from 'prop-types';

const ProfileWants = ({
  want: { title, description }
}) => (
  <div>
    <h3 className="text-dark">{title}</h3>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileWants.propTypes = {
  want: PropTypes.object.isRequired
};

export default ProfileWants;