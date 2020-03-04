const PelangganModel = require('../models').Pelanggan;
const PesananModel = require('../models').Pesanan;
const _helper = require('../helpers/utils');

module.exports = {
  async create(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    const verify = await _helper.checkToken(req.headers['authorization'])

    if (verify) {
      return PesananModel
        .create({
          id_pelanggan: req.body.id_pelanggan,
          tanggal_pesanan: req.body.tanggal_pesanan,
          total_harga: req.body.total_harga
        })
        .then((pesanan) => res.status(201).json(_helper.successHandler(pesanan)))
        .catch((error) => res.status(400).json(_helper.errorHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

  async update(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    

    if (verify) {
      return PesananModel
        .findByPk(req.params.id)      
        .then(pesanan => {
          if (!pesanan) {
            return res.status(404).send(_helper.errorHandler('Not Found'));
          }
          return pesanan
            .update({
              id_pelanggan: req.body.pelanggan || pesanan.id_pelanggan,
              tanggal_pesanan: req.body.tanggal_pesanan,
              total_harga: req.body.total_harga
            })
            .then(() => res.status(200).json(_helper.successHandler(pesanan)))
            .catch((error) => res.status(400).json(_helper.errorHandler(error)));
        })
        .catch((error) => res.status(400).json(_helper.errorHandler(error)));
      } else {
        res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
      }
  },

  async delete(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    

    if (verify) {
      return PesananModel
        .findByPk(req.params.id)
        .then(pesanan => {
          if (!pesanan) {
            return res.status(404).json(_helper.errorHandler('Not Found!'));
          }
          return pesanan
            .destroy()
            .then(() => res.status(204).json(_helper.successHandler('sucess')))
            .catch((error) => res.status(400).json(_helper.errorHandler(error)));
        })
        .catch((error) => res.status(400).json(_helper.errorHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

  async list(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    const verify = await _helper.checkToken(req.headers['authorization'])
    if (verify) {
      return PesananModel
        .findAll({
          include: [],
          order: [
            ['createdAt', 'DESC'],
          ],
        })
        .then((pesanan) => res.status(200).json(_helper.successHandler(pesanan)))
        .catch((error) => res.status(400).send(_helper.successHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

  async getById(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));
    
    const verify = await _helper.checkToken(req.headers['authorization'])
    
    if (verify) {
      return PesananModel
        .findByPk(req.params.id, {
          include: [{
            model: PelangganModel,
            as: 'pelanggan',
            attributes: {
              exclude: ['id','createdAt','updatedAt']
            }
          }],
        })
        .then((pesanan) => {
          if (!pesanan) {
            return res.status(404).json(_helper.errorHandler('Not Found!'));
          }
          return res.status(200).json(_helper.successHandler(pesanan))
        })
        .catch((error) => res.status(400).send(_helper.errorHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

  async getByPelanggan(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    const verify = await _helper.checkToken(req.headers['authorization'])
    if (verify) {
      return PesananModel
        .findAll({
          include: [],
          order: [
            ['createdAt', 'DESC'],
          ],
          where: {
            id_pelanggan: req.params.id
          }
        })
        .then((pesanan) => res.status(200).json(_helper.successHandler(pesanan)))
        .catch((error) => res.status(400).send(_helper.successHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

}