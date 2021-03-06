const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            kind: req.body.kind,
            category: req.body.category,
            area: req.body.area,
            country: req.body.country,
            state: req.body.state,
            proximity: req.body.proximity,
            name: user.name,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/scroll
// @desc    Get all posts for infinite scroll
// @access  Private
router.post('/scroll', auth, async (req,res) => {
    try {
        const posts = await Post.find().limit(req.body.recordsPerPage).skip(req.body.recordsOffset);
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/user/:id
// @desc    Get all posts by a user
// @access  Private
router.get('/user/:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        const user = await User.findById(profile.user);
        const posts = await Post.find({ user: user._id }).sort({ date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // check on user
        if (post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'User not authorized'});
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        //already liked?
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json( { msg: 'Post already liked' });
        }

        post.likes.unshift({ user: req.user.id} );

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        //already liked?
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json( { msg: 'Post not yet been liked' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment on a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        // pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        // make sure comment exists
        if(!comment) {
            return res.status(404).json({ msg: 'Comment not found'} );
        }
        // is right user?
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json( { msg: 'User not authorized' });
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// // @route   PUT api/post/servicearea
// // @desc    Add post service area
// // @access  Private
// // regional, worldwide, local

// router.put('/servicearea/:id', [auth, [
//     check('kind', 'Kind is required').not().isEmpty(),
// ]], async (req, res) => {
//     console.log('!!!!USER', req.user);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json( {errors: errors.array() } );
//     }

//     const {
//         kind,
//         location,
//         proximity,
//     } = req.body;

//     const newSvcArea = {
//         kind,
//         location,
//         proximity
//     }

//     try {
//         const post = await Post.findById(req.params.id);
//         const profile = await Profile.findOne({ user: req.user.id });
//         console.log('!!!!profile', profile);

//         if (kind === 'Regional') {
//             if (!location) {
//                 return res.status(400).json({ msg: 'Regional types must have location information'} );
//             } else {
//                 newSvcArea.location = location;
//             }
//         } else if (kind === 'Local') {
//             newSvcArea.location = profile.location;
//         } else if (kind === 'Worldwide') {
//             newSvcArea.location = null;
//         }

//         post.serviceArea = newSvcArea;

//         await post.save();

//         res.json(post);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).end('Server Error');
//     }
// }
// );


module.exports = router;