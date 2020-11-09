const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express(); 

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