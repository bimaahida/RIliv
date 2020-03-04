const pelangganController = require('../controller').PelangganController;
const pesananController = require('../controller').PesananController;

module.exports = (app) => {
  app.get('/v1', function(req, res, next) {
    res.send('API for test Riliv');
  });

  app.post('/v1/pelanggan', pelangganController.create)
  app.get('/v1/pelanggan', pelangganController.list)
  app.put('/v1/pelanggan/:id', pelangganController.update)
  app.delete('/v1/pelanggan/:id', pelangganController.delete)
  app.get('/v1/pelanggan/:id', pelangganController.getById)

  app.post('/v1/pesanan', pesananController.create)
  app.get('/v1/pesanan', pesananController.list)
  app.put('/v1/pesanan/:id', pesananController.update)
  app.delete('/v1/pesanan/:id', pesananController.delete)
  app.get('/v1/pesanan/:id', pesananController.getById)
  app.get('/v1/pesanan/pelanggan/:id', pesananController.getByPelanggan)
}