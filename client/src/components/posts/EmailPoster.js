import React, { useState, Fragment, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { sendMail } from '../../actions/mail';


const EmailPoster = ({ sendMail }) => {
    return (
        <Fragment>
            <button onClick={sendMail}>Send mail</button>
        </Fragment>
    )
}

EmailPoster.propTypes = {
    sendMail: PropTypes.func.isRequired,
}

export default connect(null, {sendMail})(withRouter(EmailPoster));
