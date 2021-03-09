"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Relations
// MANY TO MANY
db.Flight.belongsToMany(db.Booking, {
  through: "FlightBooking",
  foreignKey: { fieldName: "flightId" },
});
db.Booking.belongsToMany(db.Flight, {
  through: "FlightBooking",
  foreignKey: { fieldName: "bookingId" },
});

//ONE TO MANY (LOCATION - FLIGHT)
db.Location.hasMany(db.Flight, {
  foreignKey: "departureId",
  as: "fromLocation",
});
db.Flight.belongsTo(db.Location, {
  as: "fromLocation",
});

db.Flight.belongsTo(db.Location, {
  as: "toLocation",
});
//////////////////////////////////////
db.Airline.hasMany(db.Flight, {
  as: "flights",
  foreignKey: { fieldName: "airlineId" },
});
db.Flight.belongsTo(db.Airline, {
  foreignKey: "airlineId",
});
// ONE TO ONE
db.User.hasOne(db.Airline, {
  foreignKey: "userId",
  as: "airline",
});
db.Airline.belongsTo(db.User, { as: "user" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
