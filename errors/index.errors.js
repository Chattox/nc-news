const handleCustomErrors = (err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (err, req, res, next) => {
  if (err.code !== undefined) {
    if (err.code === '22P02') {
      res.status(400).send({ msg: '400 bad request' });
    } else if (err.code === '23503') {
      res.status(404).send({ msg: '404 not found' });
    } else if (err.code === '42703') {
      res.status(400).send({ msg: '400 bad request' });
    } else if (err.code === '23502') {
      res.status(400).send({ msg: '400 bad request' });
    }
  } else {
    next(err);
  }
};

const handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: '500 internal server error' });
};

const handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: '405 method not allowed' });
};

module.exports = {
  handleCustomErrors,
  handlePSQLErrors,
  handle500Errors,
  handle405Errors
};
