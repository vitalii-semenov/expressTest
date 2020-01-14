const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const homeRoutes = require('./routes/home');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use('/api/v1', homeRoutes);

async function start() {
  try {
    const url = 'mongodb+srv://impl:CVBJw7mCpzKw3mKp@cluster0-b7ops.mongodb.net/test?retryWrites=true&w=majority';
    await mongoose.connect(url,
        {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true});
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }

}

start();




