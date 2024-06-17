const { productService } = require('../services');
const controllerFactory = require('./controller.factory');

const { create, getAll } = controllerFactory(productService);

module.exports = {
  create,
  getAll,
};
