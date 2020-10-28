import React from 'react'
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-experience" className="btn btn-light"
          ><i className="fas fa-handshake text-primary"></i> Add Haves/Wants</Link>
        <Link to="/add-education" className="btn btn-light"
          ><i className="fas fa-globe-americas text-primary"></i> Add Location</Link>
      </div>
    )
}

export default DashboardActions
