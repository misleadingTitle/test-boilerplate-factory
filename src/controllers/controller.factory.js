const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

const getController = (service) => {
  const create = catchAsync(async (req, res) => {
    const entity = await service.create(req.body);
    res.status(httpStatus.CREATED).send(entity);
  });

  const getAll = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await service.query(filter, options);
    res.send(result);
  });

  const getOne = catchAsync(async (req, res) => {
    const entity = await service.getById(req.params.entityId);
    if (!entity) {
      throw new ApiError(httpStatus.NOT_FOUND, 'entity not found');
    }
    res.send(entity);
  });

  const updateOne = catchAsync(async (req, res) => {
    const entity = await service.updateById(req.params.entityId, req.body);
    res.send(entity);
  });

  const deleteOne = catchAsync(async (req, res) => {
    await service.deleteById(req.params.entityId);
    res.status(httpStatus.NO_CONTENT).send();
  });

  return {
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne,
  };
};

module.exports = getController;
