import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { sendMail } from '../../actions/mail';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : '#1d1c1c',

  }
};

Modal.setAppElement('#root');

const PostItem = ({
  sendMail,
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { _id, text, name, user, likes, comments, date, kind, category, area, country, state, proximity },
  showActions
}) => {
  const doMail = (to, from) => {
    const mailData = {
        to: to,
        from: from,
        deal: deal
    }
    sendMail(mailData);
  }
  const [formData, setFormData] = useState({
    deal: ''
  });
const {
    deal
} = formData;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(e){
    e.preventDefault();
    setIsOpen(false);
    doMail(user, auth.user)
  }

const onChange = e => 
setFormData({ ...formData, [e.target.name]: e.target.value });
  
  return (
    <div className="post bg-light p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
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
            {!auth.loading && user !== auth.user._id && (
              <button
              onClick={openModal}
                type="button"
                className="btn btn-primary"
              >
                <i className="fas fa-envelope"></i> Email Poster
              </button>
            )}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <a onClick={(e) => closeModal(e)} href="!#"><i className="fas fa-times"></i></a>
              <h3>Describe the deal you want to make. Only the member will see this.</h3>
              <form>
              <textarea className="deal-textarea" placeholder="" name="deal" value={deal} onChange={e => onChange(e)}></textarea><br></br>
              <button className="btn btn-primary" onClick={closeModal}>Send your message</button>
              </form>
            </Modal>
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
  deletePost: PropTypes.func.isRequired,
  sendMail: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, sendMail, removeLike, deletePost })(
  PostItem
);
