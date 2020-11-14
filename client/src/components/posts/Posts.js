import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getScrollPosts } from '../../actions/post';

const Posts = ({ getScrollPosts , post: { posts, loading }}) => {
	const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(10);
    const recordsPerPage = 10;
    useEffect(() => {
        getScrollPosts({
            recordsPerPage: recordsPerPage,
            recordsOffset: 0
        })
    },[]);

    useEffect(() => {
		window.addEventListener('scroll', () => {
            if (
                Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
                isFetching
            )
                return;
            setIsFetching(true);
        });
    }, [isFetching]);
    
    const fetchData = async () => {
            getScrollPosts({
                    recordsPerPage: recordsPerPage,
                    recordsOffset: page
                })
    };
    
    useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
        setPage(page + 10);
		fetchData();
		setIsFetching(false);
    };

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">All Posts</h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the Community</p>
            {
                posts.length > 0 ? (posts.map(postArray => (
                    postArray.map(p => (<PostItem key={p._id} post={p}/>
                    ))
                ))
                ) : 'No Posts'
            }
        </Fragment>
    );
}

Posts.propTypes = {
    getScrollPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getScrollPosts })(Posts);
