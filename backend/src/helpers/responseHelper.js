exports.sendResponse = (res, status, data) => {
    res.status(status).json({ data });
  };
  
  exports.sendError = (res, status, message) => {
    res.status(status).json({ message });
  };