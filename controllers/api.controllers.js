const endpoints = require('../endpoints');

const getEndpoints = (req, res, next) => {
  const formattedEndpoints = JSON.stringify(endpoints);
  res.status(200).send({ endpoints: formattedEndpoints });
};

module.exports = { getEndpoints };
