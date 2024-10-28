"use strict";

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ 
    message: err.message || 'Ocurrió un error interno' 
  });
};