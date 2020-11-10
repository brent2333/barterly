const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express(); 
const aws = require('aws-sdk');

// connect DB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/upload', require('./routes/api/file'));

//serve static assets in prod
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));  

  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

aws.config.region = 'us-east-1';


const S3_BUCKET = process.env.S3_BUCKET;
// const S3_BUCKET = 'barterly';

/*
 * Respond to GET requests to /sign-s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and
 * the anticipated URL of the image.
 */
app.get('/sign-s3', (req, res) => {
  // console.log('$$$$$$$ SIGNs3', req);
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});