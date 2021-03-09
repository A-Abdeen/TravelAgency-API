module.exports = (sequelize, DataTypes) => {
  const Flight = sequelize.define("Flight", {
    departureDate: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    arrivalDate: {
      type: DataTypes.DATE,
      // allowNull: false,
    },
    //////////////////////////////////////// Location module
    // departureAirport: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // arrivalAirport: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    /////////////////////////////////////
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
