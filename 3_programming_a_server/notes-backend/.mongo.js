const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URI;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

mongoose
  .connect(URL)
  .then(() => {
    console.log('connected');
    return Note.find({})
  })
  .then(result => {
    result.forEach(note => console.log(note));
    mongoose.connection.close();
    console.log('connection closed');
  })
  .catch(err => console.log(err))
