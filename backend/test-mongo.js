require('dotenv').config();
const mongoose = require('mongoose');

console.log('Using MONGO_URI:', process.env.MONGO_URI ? 'present' : 'MISSING');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected OK');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error('CONN ERROR:', err.message);
    process.exit(1);
  });
