'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pesanan = sequelize.define('Pesanan', {
    id_pelanggan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tanggal_pesanan: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Pesanan.associate = function(models) {
    Pesanan.belongsTo(models.Pelanggan, {
      foreignKey: 'id_pelanggan',
      as: 'pelanggan'
    })
  };
  return Pesanan;
};