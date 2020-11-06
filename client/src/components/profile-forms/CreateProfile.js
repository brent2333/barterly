import React, { useState, Fragment, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { createProfile } from '../../actions/profile';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        website: '',
        bio: '',
        file: {}
    });
    const {
        website,
        bio,
    } = formData;
    // file upload
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area
    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);
      
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
      };
      const updateBorder = (dragState) => {
        if (dragState === 'over') {
          dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
          dropRef.current.style.border = '2px dashed #e9ebeb';
        }
      };
      // end file upload
    const onChange = e => 
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();

        if (file) {
            console.log("WE HAVE A FILE");
            formData.append('file', file);
        }

        formData.append('bio', bio);
        formData.append('website', website);

        createProfile(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Tell us a little about you
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                <small className="form-text">* Tell us a little about yourself</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="a website link (optional)" name="website" value={website} onChange={e => onChange(e)} />
                <small className="form-text"
                    >Could be your own or a company website</small
                >
                </div>
                <div className="upload-section">
                <span className="text-primary nowrap">Upload a profile image&nbsp; &nbsp;</span>
                <Dropzone
                onDrop={onDrop}
                onDragEnter={() => updateBorder('over')}
                onDragLeave={() => updateBorder('leave')}>
                    {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                        <input {...getInputProps()} />
                        <p>Drag and drop a file OR click here to select a file</p>
                        {file && (
                        <div>
                            <strong>Selected file:</strong> {file.name}
                        </div>
                        )}
                    </div>
                    )}
                </Dropzone>
                {previewSrc ? (
                    isPreviewAvailable ? (
                    <div className="image-preview">
                        <img className="preview-image" src={previewSrc} alt="Preview" />
                    </div>
                    ) : (
                    <div className="preview-message">
                        <p>No preview available for this file</p>
                    </div>
                    )
                ) : (
                    <div className="preview-message">
                    <p>Image preview will be shown here after selection</p>
                    </div>
                )}
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
    </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
}

export default connect(null, {createProfile})(withRouter(CreateProfile));
