import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { sendMail } from '../../actions/mail';
import { connect } from 'react-redux';


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

const ProfileAbout = ({
  sendMail,
  auth,
  profile: {
    bio,
    skills,
    user: { name, _id }
  }
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
    doMail(_id, auth.user)
  }

const onChange = e => 
setFormData({ ...formData, [e.target.name]: e.target.value });
  return (<div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className="line"></div>
        <button onClick={openModal} className="btn btn-primary">Email this Member</button>
        <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <a onClick={(e) => closeModal(e)} href="!#"><i className="fas fa-times"></i></a>
              <h3>What do you want to say? Only the member will see this.</h3>
              <form>
              <textarea className="deal-textarea" placeholder="" name="deal" value={deal} onChange={e => onChange(e)}></textarea><br></br>
              <button className="btn btn-primary" onClick={closeModal}>Send your message</button>
              </form>
            </Modal>
      </Fragment>
    )}
  </div>
  )
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {sendMail})(ProfileAbout);
