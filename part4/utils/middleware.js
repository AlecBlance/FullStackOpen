/* eslint-disable consistent-return */
const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') return response.status(400).json({ error: error.message });
  if (error.name === 'JsonWebTokenError') return response.status(400).json({ error: error.message });
  next(error);
};

const tokenExtractor = (request, response, next) => {
  request.token = null;
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) request.token = authorization.replace('Bearer ', '');
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
