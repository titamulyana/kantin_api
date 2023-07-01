'use strict';

const { sequelize } = require('../models');
const { User } = require('../models/index');
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require('../helpers');

class userConttrollers {
  static async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const { userId } = req.params;

      // Find the user
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the current password is correct
      const isPasswordCorrect = comparePassword(
        currentPassword,
        user.password
      );

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ message: 'Incorrect current password' });
      }

      // Update the user's password
      await user.update({ password: newPassword });

      res
        .status(200)
        .json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { canteenName, username, password } = req.body;

      const user = await User.create({
        canteenName,
        username,
        password,
      });

      res.status(201).json({
        message: 'success create user',
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw { name: 'WrongPassword' };
      }

      const isPasswordCorrect = comparePassword(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw { name: 'WrongPassword' };
      }

      const token = generateToken({
        id: user.id,
        username: user.username,
        canteenName: user.canteenName,
      });

      const payload = {
        id: user.id,
        canteen_name: user.canteenName,
        username: user.username,
      };

      res.status(200).json({
        token,
        payload,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userConttrollers;
