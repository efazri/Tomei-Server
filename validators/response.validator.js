const { validationResult } = require('express-validator');
const Response = require('../responses/response.class');

module.exports = {
  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const response = new Response(res);
    return response.contentFail(response.statusUnprocessableEntity, errors.array());
  },
};
