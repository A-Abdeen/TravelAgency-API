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
      type: DataTypes.STRING, //use moment
      // allowNull: false,
    },
    arrivalTime: {
      type: DataTypes.STRING,
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
