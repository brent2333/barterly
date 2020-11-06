import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
// import Moment from 'react-moment';
import { deleteHaves } from '../../actions/profile';

const Haves = ({ have, deleteHaves }) => {
    const haves = have.map(
        hw => (
            <tr key={hw._id}>
                <td>{hw.skills}</td>
                <td className="hide-sm">{hw.products}</td>
                {/* <td>
                    <Moment format='YYYY/MM/DD'>{hw.from}</Moment> - {
                        hw.to === null ? (' Now') 
                        : 
                    (<Moment format='YYYY/MM/DD'>{hw.to}</Moment>)
                    }
                </td> */}
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
            <h2 className="my-2">Haves</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="hide-sm">Good/Service</th>
                        <th className="hide-sm">Description</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {haves}
                </tbody>
            </table>
        </Fragment>
    )
}

Haves.propTypes = {
    have: PropTypes.array.isRequired,
    deleteHaves: PropTypes.func.isRequired,
}

export default connect(null, { deleteHaves })(Haves);
