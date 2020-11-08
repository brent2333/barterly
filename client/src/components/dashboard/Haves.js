import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// import Moment from 'react-moment';
import { deleteHaves } from '../../actions/profile';

const Haves = ({ haves, deleteHaves }) => {
    const have = haves.map(
        hw => (
            <tr key={hw._id}>
                <td>{hw.title}</td>
                <td className="hide-sm">{hw.description}</td>
                <td>
                    <button
                    className="btn btn-danger"
                    onClick={() => deleteHaves(hw._id)}>Delete</button>
                </td>
            </tr>

        )
    )
    return (
        <Fragment>
            <h2 className="my-2">My Haves</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">Good/Service</th>
                        <th className="hide-sm">Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {have}
                </tbody>
            </table>
        </Fragment>
    )
}

Haves.propTypes = {
    have: PropTypes.array,
    deleteHaves: PropTypes.func.isRequired,
}

export default connect(null, { deleteHaves })(Haves);
