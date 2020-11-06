const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    kind:{
        type: String,
        required: true,
    },
    goodsServices:{
        type: String,
        required: true,
    }, 
    category: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    serviceArea: {
        kind: {
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
        proximity:  {
          type: String
        }
      },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('post', PostSchema);