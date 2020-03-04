const PelangganModel = require('../models').Pelanggan;
const PesananModel = require('../models').Pesanan;
const _helper = require('../helpers/utils');

module.exports = {
  async create(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    const verify = await _helper.checkToken(req.headers['authorization'])

    if (verify) {
      return PelangganModel
      .create({
        nama: req.body.nama,
        tanggal_daftar: req.body.tanggal_daftar,
        umur: req.body.umur,
        no_hp: req.body.no_hp,
      })
      .then((pelanggan) => res.status(201).json(_helper.successHandler(pelanggan)))
      .catch((error) => res.status(400).json(_helper.errorHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

  async update(req, res) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json(_helper.errorHandler('No token provided.'));

    const verify = await _helper.checkToken(req.headers['authorization'])

    if (verify) {
      return PelangganModel
        .findByPk(req.params.id)      
        .then(pelanggan => {
          if (!pelanggan) {
            return res.status(404).send(_helper.errorHandler('Not Found'));
          }
          return pelanggan
            .update({
              nama: req.body.nama || pelanggan.nama,
              tanggal_daftar: req.body.tanggal_daftar || pelanggan.tanggal_daftar,
              umur: req.body.umur || pelanggan.umur,
              no_hp: req.body.no_hp || pelanggan.no_hp,
            })
            .then(() => res.status(200).json(_helper.successHandler(pelanggan)))
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

    const verify = await _helper.checkToken(req.headers['authorization'])

    if (verify) {
      return PelangganModel
      .findByPk(req.params.id)
      .then(pelanggan => {
        if (!pelanggan) {
          return res.status(404).json(_helper.errorHandler('Not Found!'));
        }
        return pelanggan
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
      return PelangganModel
        .findAll({
          include: [],
          order: [
            ['createdAt', 'DESC'],
          ],
        })
        .then((pelanggan) => res.status(200).json(_helper.successHandler(pelanggan)))
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
      return PelangganModel
      .findByPk(req.params.id, {
        include: [{
          model: PesananModel,
          as: 'listPesanan'
        }],
      })
      .then((pelanggan) => {
        if (!pelanggan) {
          return res.status(404).json(_helper.errorHandler('Not Found!'));
        }
        return res.status(200).json(_helper.successHandler(pelanggan))
      })
      .catch((error) => res.status(400).send(_helper.errorHandler(error)));
    } else {
      res.status(400).json(_helper.errorHandler('Failed to authenticate token.'))
    }
  },

}