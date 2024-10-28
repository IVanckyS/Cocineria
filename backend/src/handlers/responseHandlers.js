"use strict";

export const handleSuccess = (res, status, message, data = null) => {
  res.status(status).json({
    status: "Success",
    message,
    data,
  });
};

export const handleErrorClient = (res, status, message, details = null) => {
  res.status(status).json({
    status: "Client error",
    message,
    details,
  });
};

export const handleErrorServer = (res, status, message) => {
  res.status(status).json({
    status: "Server error",
    message,
  });
};