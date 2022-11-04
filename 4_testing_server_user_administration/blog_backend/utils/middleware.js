const jwt = require('jsonwebtoken');
const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  const { method, path, body } = request;
  logger.info(`${method} ${path} ${JSON.stringify(body)}`);
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'ValidationError') {
    return response.status(400).end();
  } if (error.name === 'CastError') {
    return response.status(400).end();
  } if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({
      error: 'invalid token',
    });
  }

  next(error);
};

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if (user) {
      request.user = user;
    }
  } else {
    request.user = null;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
};
