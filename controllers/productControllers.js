'use strict';

const { sequelize } = require('../models');
const { Product, Sales } = require('../models/index');

class productControllers {
  static async createProduct(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, price, type } = req.body;
      const product = await Product.create({
        userId,
        name,
        price,
        type,
      });

      res.status(201).json({
        message: 'success create product',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProduct(req, res, next) {
    try {
      const id = req.user.id;
      const products = await Product.findAll({
        where: { userId: +id, softdelete: false },
      });

      res.status(200).json({
        Total: products.length,
        products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;
      const product = await Product.findOne({
        where: { id, userId, softdelete: false },
      });

      if (product) {
        return res.status(200).json({
          product,
          message: 'Success',
        });
      } else {
        return res.status(400).json({
          message: 'Failed',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;

      const [deleteProduct] = await Product.update(
        { softdelete: true },
        { where: { id, userId } }
      );

      if (deleteProduct > 0) {
        return res.status(200).json({
          message: 'success delete product',
        });
      } else {
        return res.status(400).json({
          message: 'failed delete product',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;
      const { name, price, type } = req.body;

      const findProduct = await Product.findOne({
        where: {
          id,
          softdelete: false,
        },
      });

      if (!findProduct)
        return res
          .status(404)
          .json({ message: 'product tidak ditemukan' });

      if (!Number.isInteger(price)) {
        return res.status(400).json({
          message: 'Price harus berupa nilai / integer',
        });
      }

      if (!['makanan', 'minuman'].includes(type)) {
        return res.status(400).json({
          message: 'Type salah, hanya makanan / minuman',
        });
      }

      const [product] = await Product.update(
        { name, price, type },
        { where: { id, userId, softdelete: false } }
      );

      if (product > 0) {
        // Update was successful
        return res.status(201).json({
          message: 'success update product',
        });
      } else {
        // No rows were affected, update failed
        return res.status(400).json({
          message: 'failed update product',
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = productControllers;
