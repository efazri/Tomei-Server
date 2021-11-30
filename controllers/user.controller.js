const { user } = require('../models');
const Response = require('../responses/response.class');
const bcrypt = require('../helpers/bcrypt');

class AdminLoginController {
  static async getAllUsers(req, res) {
    const response = new Response(res);
    try {
      const result = await user.findAll({ attributes: { exclude: ['password'] } });
      return response.contentSuccess(response.statusOk, { result });
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getUser(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const result = await user.findOne({ where: { id }, attributes: { exclude: ['password'] } });
      if (!result) {
        const error = {
          message: 'USER NOT FOUND',
          statusCode: response.statusBadRequest,
        };
        throw error;
      }

      return response.contentSuccess(response.statusOk, { result });
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async createUser(req, res) {
    const response = new Response(res);
    try {
      const {
        // eslint-disable-next-line camelcase
        name, email, password, avatar_picture, confirm_pass,
      } = req.body;

      // eslint-disable-next-line camelcase
      if (password !== confirm_pass) {
        const error = {
          message: 'PASSWORD NOT MATCH',
          statusCode: response.statusBadRequest,
        };
        throw error;
      }

      const dataUser = {
        name, email, password: bcrypt.hassPass(password), avatar_picture,
      };

      const result = await user.create(dataUser, { fields: ['id', 'name', 'email', 'avatar_picture'] });

      return response.contentSuccess(response.statusOk, { result });
    } catch (error) {
      if (error.errors[0].message) {
        error.message = error.errors[0].message;
      }
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async updateUser(req, res) {
    const response = new Response(res);
    try {
      const {
        // eslint-disable-next-line camelcase
        name, email, password, avatar_picture,
      } = req.body;

      const { id } = req.params;

      const dataUser = {
        name, email, password: bcrypt.hassPass(password), avatar_picture,
      };

      await user.update(dataUser, {
        where: { id },
        fields: ['id', 'name', 'email', 'avatar_picture'],
        returning: true,
      });

      return response.contentSuccess(response.statusOk, { result: `Succees update id : ${id}` });
    } catch (error) {
      if (error.errors[0].message) {
        error.message = error.errors[0].message;
      }
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async deleteUser(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;

      const find = await user.findOne({ where: { id } });
      if (!find) {
        const error = {
          message: 'USER NOT FOUND',
          statusCode: response.statusBadRequest,
        };
        throw error;
      }

      await user.destroy({
        where: { id },
        returning: true,
        attributes: { exclude: ['password'] },
      });

      return response.contentSuccess(response.statusOk, { result: `Succees delete id : ${id}` });
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = AdminLoginController;
