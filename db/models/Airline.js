module.exports = (sequelize, DataTypes) => {
  const Airline = sequelize.define("Airline", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
    },
  });

  return Airline;
};
