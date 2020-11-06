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
    haves: [
      {
        skills: {
          type: [String]    
        },
        products: {
          type: [String]
        },
      }
    ],
    wants: [
      {
        skills: {
          type: [String]    
        },
        products: {
          type: [String]
        },
      }
    ],
    bio: {
      type: String
    },
    date: {
    type: Date,
    default: Date.now
    },
    file: {
      file_path: {
        type: String,
      },
      file_mimetype: {
        type: String,
      }
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
});

module.exports = mongoose.model('profile', ProfileSchema);