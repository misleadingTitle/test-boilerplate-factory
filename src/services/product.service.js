const serviceFactory = require('./service.factory');

const { Product } = require('../models');

const { create, query } = serviceFactory(Product);

module.exports = {
  create,
  query,
};
