module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    departureDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    arrivalDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    departureTime: {
      type: DataTypes.TIME,
      // allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.TIME,
      // allowNull: false,
    },
    economySeats: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    economyPrice: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    businessSeats: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    businessPrice: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
  });
  return Flight;
};
