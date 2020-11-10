import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import handshake from '../../img/handshake.svg';


const Navbar = ({ auth: { isAuthenticated, loading }, logout, history}) => {
  const doLogout = (event) => {
    event.preventDefault();
    logout();
    window.location = '/';
  }
  const guestLinks = (
    <ul>
        <li>
          <Link to='/members'>
            Members
          </Link>
        </li>
        <li>
          <Link to="/register">
            Sign Up
          </Link>
        </li>
      <li>
        <Link to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
        <li>
          <Link to='/profiles'>
            Profiles
          </Link>
        </li>
        <li>
          <Link to='/posts'>
            All Posts
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
      <li>
        <a onClick={e => doLogout(e)} href="!#">
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span>
        </a>
        </li>
    </ul>
  );
    return (
        <nav className="navbar bg-light">
        <h1>
          <Link to="/">Barterly</Link> 
          <img src={handshake} width="40px" alt="logo" style={{position: 'absolute'}} />
        </h1>
    { !loading && (<Fragment>{ isAuthenticated ?  authLinks : guestLinks }</Fragment>) }
      </nav>
    )
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);