module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define("Passenger", {
    title: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    passportNum: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    countryIssue: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      //allowNull: false,
    },
  });

  return Passenger;
};
