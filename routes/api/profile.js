const express = require('express');
const router = express.Router();
const request = require('request');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const config = require('config');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');



// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
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
router.post('/', [auth, [
    check('location', 'Location is required').not().isEmpty(),
    check('bio', 'Bio is required').not().isEmpty()

]], async (req, res) => {
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
        serviceArea
    } = req.body;
    // build profile object
    const profileFields = {
        user: req.user.id,
        website: website && website !== '' ? normalize(website, { forceHttps: true }) : '',
        bio,
        location,
        serviceArea
      };

    profileFields.haves = Array.isArray(haves) ? profileFields.haves : [];
    profileFields.wants = Array.isArray(wants) ? profileFields.wants : [];

    try {
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
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id}).populate('user', ['name', 'avatar']);
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

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
// router.put('/experience', [auth, [
//     check('title', 'Title is required').not().isEmpty(),
//     check('company', 'Company is required').not().isEmpty(),
//     check('from', 'From Date is required').not().isEmpty()
// ]], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json( {errors: errors.array() } );
//     }

//     const {
//         title,
//         company,
//         location,
//         from,
//         to,
//         current,
//         description
//     } = req.body;

//     const newExp = {
//         title,
//         company,
//         location,
//         from,
//         to,
//         current,
//         description
//     }

//     try {
//         const profile = await Profile.findOne({ user: req.user.id });

//         profile.experience.unshift(newExp);

//         await profile.save();

//         res.json(profile);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).end('Server Error');
//     }
// }
// );

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete an experience
// @access  Private 5f8dea1c3602612b8422f2b5
// router.delete('/experience/:exp_id', auth, async (req,res) => {
//     try {
//         const profile = await Profile.findOne({ user: req.user.id });

//         // get remove index
//         const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
//         profile.experience.splice(removeIndex, 1);

//         await profile.save();

//         res.json(profile);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).end('Server Error');
//     }
// });

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
// router.put('/education', [auth, [
//     check('school', 'School is required').not().isEmpty(),
//     check('degree', 'Degree is required').not().isEmpty(),
//     check('from', 'From Date is required').not().isEmpty(),
//     check('fieldofstudy', 'Field of Study is required').not().isEmpty(),


// ]], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json( {errors: errors.array() } );
//     }

//     const {
//         school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
//     } = req.body;

//     const newEdu = {
//         school,
//         degree,
//         fieldofstudy,
//         from,
//         to,
//         current,
//         description
//     }

//     try {
//         const profile = await Profile.findOne({ user: req.user.id });

//         profile.education.unshift(newEdu);

//         await profile.save();

//         res.json(profile);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).end('Server Error');
//     }
// }
// );

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete an education
// @access  Private 5f8dea1c3602612b8422f2b5
router.delete('/education/:edu_id', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).end('Server Error');
    }
});


module.exports = router;