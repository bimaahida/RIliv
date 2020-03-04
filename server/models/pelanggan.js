'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pelanggan = sequelize.define('Pelanggan', {
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggal_daftar: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    umur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Pelanggan.associate = function(models) {
    Pelanggan.hasMany(models.Pesanan, {
      foreignKey: 'id_pelanggan',
      as: 'listPesanan',
    })
  };
  return Pelanggan;
};