import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPostsByUser } from '../../actions/post';
const PostsByUser = ({ getPostsByUser , post: { posts, loading }, match}) => {
    useEffect(() => {
        getPostsByUser(match.params.id);
    }, [getPostsByUser, match.params.id]);
    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts By User</h1>
            {/* <p className="lead"><i className="fas fa-user"></i>Posts By User</p> */}
            { posts.length > 0 ? (<div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>) : <Fragment>... No posts :(</Fragment>
            }
        </Fragment>
    );
}

PostsByUser.propTypes = {
    getPostsByUser: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPostsByUser })(PostsByUser);
