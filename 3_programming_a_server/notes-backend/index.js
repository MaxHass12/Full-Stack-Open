require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const Note = require('./models/note');

const requestLogger = (request, response, next) => {
  console.log('method: ', request.method);
  console.log('path: ', request.path);
  console.log('body: ', request.body);
  console.log('---');
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'});
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed ID'});
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message});
  }

  next(error);
}

// MIDDLEWARE
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.use(express.static('build'));

// ROUTES

// app.get('/api/notes', (request, response) => {
//   response.send(notes);
// });

app.get('/api/notes', (request, response) => {
  Note.find({})
      .then(notes => response.json(notes));
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note);
        } else {
          response.status(404).send({error: '404 not found'});
        }
      })
      .catch(error => next(error))
});

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
      .then(() => response.status(204).end())
      .catch(error => next(error))
});

app.post('/api/notes', (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'});
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  note.save()
      .then(savedNote => response.json(savedNote))
      .catch(error => next(error));
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id, 
    {content, important}, 
    {new: true, runValidators: true, context: 'query'}
  )
      .then(updatedNote => response.json(updatedNote))
      .catch(error => next(error))
})

// 404
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.port || process.env.PORT || 8080;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
