// const SequelizeSlugify = require("sequelize-slugify");

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
  // SequelizeSlugify.slugifyModel(Airline, {
  //   source: ["name"],
  // });
  return Airline;
};
