module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username taken",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    userType: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  });
  return User;
};
