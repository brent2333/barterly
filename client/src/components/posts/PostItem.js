import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, user, likes, comments, date, kind, category, area, country, state, proximity },
  showActions
}) => {
  
  return (
    <div className="post bg-light p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          {/* <img className="round-img" alt="" /> */}
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
            <table className="table post-table">
                <thead>
                    <tr>
                        <th className="hide-sm">Good or Service</th>
                        <th className="hide-sm">Have or Want</th>
                        <th className="hide-sm">{area ? 'Where?' : ''}</th>
                        <th className="hide-sm">{country ? 'Country' : ''}</th>
                        <th className="hide-sm">{state ? 'State' : ''}</th>
                        <th className="hide-sm">{proximity ? 'Proximity' : ''}</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                  <td><strong>{category? category.toUpperCase() : ''}</strong></td>
                  <td><strong>{kind ? kind.toUpperCase() : ''}</strong></td>
                  <td><strong>{area ? area : ''}</strong></td>
                  <td><strong>{country ? country : ''}</strong></td>
                  <td><strong>{state ? state : ''}</strong></td>
                  <td>{
                    proximity ? (<small>Within {proximity} Miles of poster's location (see profile)</small>) : ''
                  }</td>
                </tr>
              </tbody>
            </table>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
PostItem.defaultProps = {
  showActions: true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
