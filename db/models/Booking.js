module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    fullName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
      email: {
        type: DataTypes.STRING,
        // allowNull: false,
        // unique: {
        //   args: true,
        //   msg: "Email address already used",
        // },
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
        type: DataTypes.STRING,
        // allowNull: false,
      },
  },
    );

  return Booking;
};