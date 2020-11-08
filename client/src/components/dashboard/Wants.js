import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// import Moment from 'react-moment';
import { deleteWants } from '../../actions/profile';

const Wants = ({ wants, deleteWants }) => {
    const want = wants.map(
        hw => (
            <tr key={hw._id}>
                <td>{hw.title}</td>
                <td className="hide-sm">{hw.description}</td>
                <td>
                    <button
                    className="btn btn-danger"
                    onClick={() => deleteWants(hw._id)}>Delete</button>
                </td>
            </tr>

        )
    )
    return (
        <Fragment>
            <h2 className="my-2">My Wants</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="hide-sm">Good/Service</th>
                        <th className="hide-sm">Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {want}
                </tbody>
            </table>
        </Fragment>
    )
}

Wants.propTypes = {
    want: PropTypes.array,
    deleteWants: PropTypes.func.isRequired,
}

export default connect(null, { deleteWants })(Wants);
