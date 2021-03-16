module.exports = (sequelize, DataTypes) => {
  const FlightBooking = sequelize.define("FlightBooking", {
    passenger: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  return FlightBooking;
};
