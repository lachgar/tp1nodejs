// src/middlewares/error.middleware.js

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    error: {
      status: statusCode,
      message: statusCode === 500 ? 'Erreur interne du serveur' : err.message
    }
  });
};
