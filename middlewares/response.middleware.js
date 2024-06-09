// const responseMiddleware = (req, res, next) => {
//   // TODO: Implement middleware that returns result of the query
//   next();
// };

// export { responseMiddleware };

const responseMiddleware = (req, res, next) => {
  res.success = (data) => {
      res.status(200).json(data);
  };

  res.error = (message) => {
      res.status(400).json({ error: true, message });
  };

  res.notFound = (message) => {
      res.status(404).json({ error: true, message });
  };

  next();
};

export { responseMiddleware };

