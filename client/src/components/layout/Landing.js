import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
    <Redirect to="/dashboard" />
    )
  }
    return (
        <section className="landing">
          <div className="landing-inner">
            <h1 className="x-large">Barterly</h1>
            <h4>Trade Goods and Services without hassle</h4><br/>
            <blockquote className="blockquote text-center text-med">
        <p className="mb-3">"The propensity to truck, barter and exchange one thing for another is common to all men, and to be found in no other race of animals."</p>
        <footer className="blockquote-footer">- Adam Smith</footer>
      </blockquote><br />
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          </div>
      </section>
    )
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing);