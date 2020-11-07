const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
      type: String
    },
    location: {
      country:  {
        type: String
      },
      zip: {
        type: String
      },
      city: {
        type: String
      }, 
      state:  {
        type: String
      }
    },
    haves: [{
      description: {
        type: String
      },
      title: {
        type: String
      },  
    }],
    wants: [{
      description: {
        type: String
      },
      title: {
        type: String
      },  
    }],
    bio: {
      type: String
    },
    date: {
    type: Date,
    default: Date.now
    },
    profileImage: {
      type: String
    },
    following: [
      {
        userProfileId: {
          type: String
        }
      }
    ],
    followers: [
      {
        userProfileId: {
          type: String
        }
      }
    ]
});

module.exports = mongoose.model('profile', ProfileSchema);