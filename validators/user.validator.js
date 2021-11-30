const { body } = require('express-validator');
const responseValidator = require('./response.validator');

exports.validateUser = [
  body('name').notEmpty(),
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  body('confirm_pass').notEmpty(),
  body('avatar_picture').notEmpty(),
  responseValidator.validate,
];
