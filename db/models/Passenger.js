module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define("Passenger", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already used",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Must be standard email format (email@domain.com)",
        },
      },
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username taken",
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    passportNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    countryIssue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Passenger;
};
