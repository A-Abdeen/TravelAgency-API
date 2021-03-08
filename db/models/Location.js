module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define("Location", {

airportName:{
  type:DataTypes.STRING,
}
  });

  return Location;
};
