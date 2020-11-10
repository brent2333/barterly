const express = require('express');
const router = express.Router();
const request = require('request');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const config = require('config');
const multer = require('multer');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const File = require('../../models/File');

const auth = require('../../middleware/auth');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile/
// @desc    Create or Update user profile
// @access  Private
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './client/public/files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg and png format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

router.post('/', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    const {
        website,
        bio,
        location,
        haves,
        wants,
        serviceArea,
        profileImage
    } = req.body;
    // build profile object
    const profileFields = {
        user: req.user.id,
        website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
        bio: bio,
        location,
        serviceArea,
        profileImage: profileImage
      };

    profileFields.haves = Array.isArray(haves) ? haves : [];
    profileFields.wants = Array.isArray(wants) ? wants : [];

    try {
        // if (file) {
        //     console.log('$$$$$ WE HAVE A FUCKING FILE', req.file)
        //     // const { path, mimetype } = req.file;
        //     // const file = new File({
        //     //   file_path: path,
        //     //   file_mimetype: mimetype
        //     // });
        //     // await file.save();
        //     // const profileImage = req.file;
        //     profileFields.profileImage = file;
        // }
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id},
                { $set: profileFields},
                { new: true }
            );
            return res.json(profile);
        }
        //create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

// @route   GET api/profile/
// @desc    Get all profiles
// @access  Public
router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:id', async (req,res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id}).populate('user', ['name']);
        if (!profile) return res.status(400).json({ msg: "Profile not found"});
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            res.status(400).json({ msg: "Profile not found" });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/profile/
// @desc    Delete profile user and posts
// @access  Private
router.delete('/', auth, async (req,res) => {
    try {
        // remove users posts
        await Post.deleteMany( {user: req.user.id});
        //remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findByIdAndRemove({ _id: req.user.id });

        res.json({msg: 'User Deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/location
// @desc    Add profile location
// @access  Private
router.put('/location', [auth, [
    check('country', 'Country is required').not().isEmpty(),
    check('zip', 'Zip is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),


]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array() } );
    }

    const {
        country,
        zip,
        city,
        state
    } = req.body;

    const newLocation = {
            country,
            zip,
            city,
            state
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.location = newLocation;

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
}
);


// @route   PUT api/profile/haves
// @desc    Add profile haves
// @access  Private
router.put('/haves', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),


]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array() } );
    }

    const {
        title,
        description
    } = req.body;

    const newHave = {
        title,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.haves.unshift(newHave);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
}
);

// @route   DELETE api/profile/haves/:id
// @desc    Delete a have
// @access  Private 5f8dea1c3602612b8422f2b5
router.delete('/haves/:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.haves.map(item => item.id).indexOf(req.params.id);
        profile.haves.splice(removeIndex, 1);
        
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});

// @route   PUT api/profile/wants
// @desc    Add profile wants
// @access  Private
router.put('/wants', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),


]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( {errors: errors.array() } );
    }

    const {
        title,
        description
    } = req.body;

    const newWant = {
        title,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.wants.unshift(newWant);

        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
}
);

// @route   PUT api/profile/follow
// @desc    Add profile follows
// @access  Private
router.put('/follow', auth, async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const followee = await Profile.findOne({ _id: req.body.userProfileId });

        const newFollower = {
            userProfileId: String(profile._id)
        }

        followee.followers.unshift(newFollower);
        console.log('PROFILE', profile);
        console.log('NEW FOLLOWER',newFollower);
        console.log('FOLLOWEE', followee);
        console.log('followee.followers',followee.followers);

        const {
            userProfileId
        } = req.body;
    
        const newFollow = {
            userProfileId: userProfileId
        }

        profile.following.unshift(newFollow);

        await profile.save();
        await followee.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
}
);

// @route   GET api/profile/follows
// @desc    Get the profiles a user is following
// @access  Private
router.get('/follows', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const profileArray = [];
        profile.following.map(p => {
            profileArray.push(p.userProfileId);
        });
        const follows = await Profile.find({_id: {$in: profileArray }});
        res.json(follows);
    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});

// @route   GET api/profile/followers
// @desc    Get the profiles a user is following
// @access  Private
router.get('/followers', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const profileArray = [];
        profile.followers.map(p => {
            profileArray.push(p.userProfileId);
        });
        const followers = await Profile.find({_id: {$in: profileArray }});
        res.json(followers);
    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});

// @route   DELETE api/profile/following/:id
// @desc    Delete a follow
// @access  Private
router.delete('/following/:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.following.map(item => item.id).indexOf(req.params.id);
        profile.following.splice(removeIndex, 1);
        
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});

// @route   DELETE api/profile/wants/:id
// @desc    Delete a have
// @access  Private
router.delete('/wants/:id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.wants.map(item => item.id).indexOf(req.params.id);
        profile.wants.splice(removeIndex, 1);
        
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});


module.exports = router;