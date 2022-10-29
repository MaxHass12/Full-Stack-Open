const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('Please provide the password as argument: node mongojs <password>');
//   process.exit(1);
// }

const password = process.argv[2];

const URL = `mongodb+srv://shwetanktewari87_cloudMongoDB:${process.env.MONGOPW}@cluster0.hlazc9q.mongodb.net/noteApp?retryWrites=true&w=majority`;

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
    result.forEach(note => console.log(JSON.stringify(note)));
    mongoose.connection.close();
    console.log('connection closed');
  })
  .catch(err => console.log(err))
