const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(productValidation.createProduct), productController.create)
  .get(validate(productValidation.getProducts), productController.getAll);

module.exports = router;
