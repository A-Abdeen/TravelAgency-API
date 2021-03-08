module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
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
      type: DataTypes.ENUM,
      values: ["MR", "MRS", "MS"],
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
      types: DataTypes.ENUM,
      values: ["Male", "Female"],
    },
    passportNum: {
      types: DataTypes.INTEGER,
      allowNull: false,
    },
    countryIssue: {
      types: DataTypes.STRING,
      allowNull: false,
    },
    expiryDate: {
      types: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Booking;
};
