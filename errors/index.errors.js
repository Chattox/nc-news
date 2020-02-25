const handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: '500 internal server error' });
};

module.exports = { handleCustomErrors, handle500Errors };
