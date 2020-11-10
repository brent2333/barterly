import React from 'react'
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
          ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
        <Link to="/add-haves" className="btn btn-light"
          ><i className="fas fa-handshake text-primary"></i> Add Haves</Link>
        <Link to="/add-wants" className="btn btn-light"
          ><i className="fas fa-handshake text-primary"></i> Add Wants</Link>
        <Link to="/add-location" className="btn btn-light"
          ><i className="fas fa-handshake text-primary"></i> Add Location</Link>
      </div>
    )
}

export default DashboardActions
