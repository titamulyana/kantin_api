'use strict';

const { raw } = require('mysql');
const { sequelize } = require('../models');
const { Sales, Product, Transaction } = require('../models/index');
const { Sequelize, Op } = require('sequelize');
const { generateSalesId } = require('../helpers');

class salesControllers {
  static async getSalesId(req, res, next) {
    try {
      const tabelNumber = req.params.table;
      const userId = req.user.id;
      const status = 'not done';
      if (isNaN(+tabelNumber)) {
        return res
          .status(400)
          .json({ message: 'params must be number' });
      }

      const number = await Transaction.count({
        where: {
          userId,
        },
      });
      const plainNumber = number + 1;

      const salesId = generateSalesId(userId, plainNumber);

      const transaction = await Transaction.create({
        salesId,
        userId,
        tabelNumber: +tabelNumber,
        status,
      });

      if (transaction) {
        return res.status(200).json({ Message: 'Succes', salesId });
      } else {
        return res
          .status(400)
          .json({ Message: 'Failed', Total: '-' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async createSales(req, res, next) {
    try {
      const { salesId, productId, qty, tableNumber } = req.body;
      const userId = req.user.id;
      const status = 'not done';

      const prices = await Product.findOne({
        where: { id: productId, userId, softdelete: false },
      });

      if (!prices) {
        return res.status(400).json({
          Message: 'Product ID tidak ditemukan',
          productId,
        });
      }
      const payment = await Transaction.findOne({
        where: {
          salesId,
          status: 'done',
        },
      });

      if (payment) {
        return res.status(400).json({
          Message: 'Transaksi already done',
          productId,
        });
      }

      const price = prices.price * qty;
      const sales = await Sales.create({
        salesId,
        userId,
        productId,
        price,
        qty,
        tableNumber,
      });

      if (sales) {
        return res.status(200).json({
          Message: 'Success Create Sales',
          Rincian: {
            salesId,
            tableNumber,
            qty,
            name: prices.name,
            price,
          },
        });
      } else {
        return res
          .status(400)
          .json({ Message: 'Failed Created sales' });
      }
    } catch (error) {
      next(error);
    }
  }

  static async delId(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      const sales = await Sales.findOne({
        where: {
          id,
          userId,
        },
      });
      if (!sales)
        return res
          .status(400)
          .json({ message: 'sales tidak ditemukan' });

      const transaction = await Transaction.findOne({
        where: {
          salesId: sales.salesId,
          userId,
          status: 'done',
        },
      });

      if (transaction)
        return res
          .status(400)
          .json({ message: 'Transaksi sudah selesai pembayaran' });

      const product = await Product.findOne({
        where: {
          id: sales.productId,
          softdelete: false,
        },
      });

      if (!product)
        return res
          .status(400)
          .json({ Message: 'product sudah tidak tersedia' });

      const delSales = await Sales.destroy({
        where: {
          id,
          userId,
        },
      });

      if (delSales > 0) {
        return res.status(200).json({
          message: 'success delete sales',
        });
      } else {
        return res.status(400).json({
          message: 'failed delete sales',
        });
      }
    } catch (error) {
      next(error);
    }
  }
  static async delSalesid(req, res, next) {
    try {
      const salesId = req.params.salesId;
      const userId = req.user.id;
      const sales = await Sales.destroy({
        where: {
          salesId,
          userId,
          status: 'not done',
        },
      });

      if (sales > 0) {
        return res.status(200).json({
          message: 'success delete sales',
        });
      } else {
        return res.status(400).json({
          message: 'failed delete sales',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllSales(req, res, next) {
    try {
      const userId = req.user.id;

      const dataNotDone = await Transaction.findAll({
        where: {
          userId,
          status: 'not done',
        },
        include: [
          {
            model: Sales,
            as: 'Sales',
          },
        ],
      });

      const notDone = dataNotDone.map((transaction) =>
        transaction.get({ plain: true })
      );

      notDone.forEach((transaction) => {
        const salesTotal = transaction.Sales.reduce(
          (sum, sale) => sum + sale.price,
          0
        );
        transaction.total = salesTotal;
      });

      const dataDone = await Transaction.findAll({
        where: {
          userId,
          status: 'done',
        },
        include: [
          {
            model: Sales,
            as: 'Sales',
          },
        ],
      });

      const done = dataDone.map((transaction) =>
        transaction.get({ plain: true })
      );

      done.forEach((transaction) => {
        const salesTotal = transaction.Sales.reduce(
          (sum, sale) => sum + sale.price,
          0
        );
        transaction.total = salesTotal;
      });

      return res.status(200).json({
        data: {
          'not done': notDone,
          done,
        },
      });

      // const sales = await Sales.findAll({
      //   where: {
      //     userId,
      //   },
      //   attributes: {
      //     exclude: ['updatedAt', 'createdAt'],
      //     include: [
      //       [
      //         Sequelize.literal(
      //           '(SELECT name FROM Products WHERE Products.id = Sales.productId )'
      //         ),
      //         'name',
      //       ],
      //       [Sequelize.literal('createdAt'), 'tanggal_penjualan'],
      //     ],
      //   },
      // });

      // if (sales.length > 0) {
      //   return res
      //     .status(200)
      //     .json({ Message: 'Succes', Total: sales.length, sales });
      // } else {
      //   return res.status(200).json({
      //     Message: 'No Data To Display',
      //     Total: sales.length,
      //     sales,
      //   });
      // }
    } catch (error) {
      next(error);
    }
  }

  static async getSalesById(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      const sales = await Sales.findOne({
        where: { id, userId },
        include: [
          {
            model: Product,
            as: 'DataProduct',
            attributes: ['name'],
          },
        ],
      });

      if (sales) {
        return res.status(200).json({
          sales,
          message: 'Success',
        });
      } else {
        return res.status(400).json({
          message: 'Failed Get sales By Id',
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getBySalesId(req, res, next) {
    try {
      const userId = req.user.id;
      const { salesId, type } = req.body;

      if (!salesId) {
        return res.status(400).json({ Message: 'required salesId' });
      }

      const sales = await Sales.findAll({
        where: { salesId, userId },
        attributes: {
          exclude: ['updatedAt', 'createdAt'],
        },
        include: [
          {
            model: Product,
            as: 'DataProduct',
            attributes: ['name'],
          },
        ],
      });
      const status = await Transaction.findOne({
        salesId,
      });

      const total = sales.reduce((b, a) => {
        return b + a.price;
      }, 0);

      if (sales) {
        return res.status(200).json({
          sales,
          status: status.status,
          total,
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

  static async laporan(req, res, next) {
    console.log();
    try {
      const userId = req.user.id;
      const { type } = req.params;

      if (!['hari', 'bulan'].includes(type)) {
        return res
          .status(400)
          .json({ Message: 'param hari  / bulan saja' });
      }

      if (type === 'hari') {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

        const penjualan = await Transaction.findAll({
          where: {
            userId,
            status: 'not done',
            createdAt: {
              [Sequelize.Op.gte]: today,
            },
          },
          include: [
            {
              model: Sales,
              as: 'Sales',
            },
          ],
        });

        const totalPenjualan = penjualan.map((e) =>
          e.get({ plain: true })
        );

        let total = 0;
        totalPenjualan.map((sales) => {
          sales.Sales.map((salesData) => {
            const price = salesData.price;
            total += price;
          });
        });

        const penjualanDone = await Transaction.findAll({
          where: {
            userId,
            status: 'done',
            createdAt: {
              [Sequelize.Op.gte]: today,
            },
          },
          include: [
            {
              model: Sales,
              as: 'Sales',
            },
          ],
        });

        const totalPenjualanDone = penjualan.map((e) =>
          e.get({ plain: true })
        );

        let totalDone = 0;
        totalPenjualanDone.map((sales) => {
          sales.Sales.map((salesData) => {
            const price = salesData.price;
            totalDone += price;
          });
        });
        penjualan.total = total;
        return res.status(200).json({
          'not done': penjualan,
          'total not done': total,
          done: penjualanDone,
          'total done': totalDone,
          Message: 'hari',
        });
      } else {
        const today = new Date(); // Mendapatkan tanggal dan waktu saat ini
        today.setDate(1); // Mengatur tanggal ke 1 untuk mendapatkan awal bulan
        today.setHours(0, 0, 0, 0); // Mengatur jam menjadi 00:00:00

        const penjualan = await Transaction.findAll({
          where: {
            userId,
            status: 'not done',
            createdAt: {
              [Sequelize.Op.gte]: today,
            },
          },
          include: [
            {
              model: Sales,
              as: 'Sales',
            },
          ],
        });

        const totalPenjualan = penjualan.map((e) =>
          e.get({ plain: true })
        );

        let total = 0;
        totalPenjualan.map((sales) => {
          sales.Sales.map((salesData) => {
            const price = salesData.price;
            total += price;
          });
        });

        const penjualanDone = await Transaction.findAll({
          where: {
            userId,
            status: 'done',
            createdAt: {
              [Sequelize.Op.gte]: today,
            },
          },
          include: [
            {
              model: Sales,
              as: 'Sales',
            },
          ],
        });

        const totalPenjualanDone = penjualan.map((e) =>
          e.get({ plain: true })
        );

        let totalDone = 0;
        totalPenjualanDone.map((sales) => {
          sales.Sales.map((salesData) => {
            const price = salesData.price;
            totalDone += price;
          });
        });
        penjualan.total = total;
        return res.status(200).json({
          'not done': penjualan,
          'total not done': total,
          done: penjualanDone,
          'total done': totalDone,
          Message: 'bulan',
        });
      }

      // const sales = await Sales.findAll({
      //   where: { userId },
      //   attributes: {
      //     exclude: ['updatedAt', 'createdAt'],
      //   },
      //   include: [
      //     {
      //       model: Product,
      //       as: 'DataProduct',
      //       attributes: ['name'],
      //     },
      //   ],
      // });

      // const status = await Transaction.findOne({
      //   salesId,
      // });

      // const total = sales.reduce((b, a) => {
      //   return b + a.price;
      // }, 0);

      // if (sales) {
      //   return res.status(200).json({
      //     sales,
      //     status: status.status,
      //     total,
      //     message: 'Success',
      //   });
      // } else {
      //   return res.status(400).json({
      //     message: 'Failed',
      //   });
      // }
    } catch (error) {
      next(error);
    }
  }

  static async updateSales(req, res, next) {
    try {
      const userId = req.user.id;
      const id = req.params.id;
      const { qty, tableNumber } = req.body;

      const order = await Sales.findOne({
        where: {
          id,
          userId,
        },
      });

      if (!order) {
        return res.status(400).json({ Message: 'Pesanan Tidak Ada' });
      }

      const statusPayment = await Transaction.findOne({
        where: {
          salesId: order.salesId,
          status: 'done',
          userId,
        },
      });

      if (statusPayment) {
        return res.status(400).json({
          Message: 'Pesanan Sudah dibayar, tidak bisa diupdate',
        });
      }
      const product = await Product.findOne({
        where: {
          softdelete: false,
          id,
        },
      });

      if (!product) {
        return res
          .status(400)
          .json({ Message: 'Product Sudah tidak tersedia' });
      }

      const price = qty * product.price;
      const [sales] = await Sales.update(
        { qty, price },
        { where: { id, userId } }
      );

      if (sales > 0) {
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

  static async updateStatus(req, res, next) {
    try {
      const userId = req.user.id;
      const salesId = req.body.salesId;

      if (!salesId) {
        return res.status(400).json({ message: 'salesId required' });
      }

      const transaction = await Transaction.findAll({
        where: { userId, salesId, status: 'not done' },
      });

      if (!transaction || transaction.length === 0) {
        return res
          .status(400)
          .json({ message: 'Transaksi tidak ditemukan' });
      }

      const update = await Transaction.update(
        {
          status: 'done',
        },
        {
          where: {
            salesId,
            userId,
          },
        }
      );

      const sales = await Sales.findAll({
        where: {
          userId,
          salesId,
        },
      });

      const totalSales = sales.map((e) => e.get({ plain: true }));
      const total = totalSales.reduce((b, a) => {
        return b + a.price;
      }, 0);
      return res.status(200).json({
        message: 'Pembayaran selesai',
        rincian: totalSales,
        total,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = salesControllers;