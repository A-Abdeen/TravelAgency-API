//allowNull set to false for testing purposes

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    fullName: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: {
        args: true,
        msg: "Username taken",
      },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
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
        //allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
    },
  });

  return Booking;
};
