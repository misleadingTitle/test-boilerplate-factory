const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const serviceFactory = (model) => {
  const create = async (body) => {
    return model.create(body);
  };

  /**
   * Query for users
   * @param {Object} filter - Mongo filter
   * @param {Object} options - Query options
   * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  const query = async (filter, options) => {
    const entities = await model.paginate(filter, options);
    return entities;
  };

  /**
   * Get user by id
   * @param {ObjectId} id
   * @returns {Promise<User>}
   */
  const getById = async (id) => {
    return model.findById(id);
  };

  // /**
  //  * Get user by email
  //  * @param {string} email
  //  * @returns {Promise<User>}
  //  */
  // const getUserByEmail = async (email) => {
  //   return model.findOne({ email });
  // };

  /**
   * Update user by id
   * @param {ObjectId} userId
   * @param {Object} updateBody
   * @returns {Promise<User>}
   */
  const updateById = async (userId, updateBody) => {
    const entities = await getById(userId);
    if (!entities) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    Object.assign(entities, updateBody);
    await model.save();
    return entities;
  };

  /**
   * Delete user by id
   * @param {ObjectId} userId
   * @returns {Promise<User>}
   */
  const deleteById = async (userId) => {
    const entities = await getById(userId);
    if (!entities) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await model.remove();
    return entities;
  };

  return {
    create,
    query,
    getById,
    updateById,
    deleteById,
  };
};

module.exports = serviceFactory;
