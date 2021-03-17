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
db.Booking.hasMany(db.Passenger, { as: "passengers", foreignKey: "bookingId" });
db.Passenger.belongsTo(db.Booking, { as: "booking" });

//we will come back later
// db.User.hasMany(db.Booking, { as: "booking" });
// db.Booking.belongsTo(db.User, { as: "user" });

db.Flight.belongsToMany(db.Booking, {
  through: db.FlightBooking,
  as: "bookings",
  foreignKey: { fieldName: "flightId" },
});

db.Booking.belongsToMany(db.Flight, {
  through: db.FlightBooking,
  as: "flights",
  foreignKey: { fieldName: "bookingId" },
});

db.Location.hasMany(db.Flight, {
  as: "originL",
  foreignKey: "originId",
});

db.Location.hasMany(db.Flight, {
  as: "destinationL",
  foreignKey: "destinationId",
});

db.Flight.belongsTo(db.Location, {
  as: "originF",
  foreignKey: "originId",
});

db.Flight.belongsTo(db.Location, {
  as: "destinationF",
  foreignKey: "destinationId",
});

db.Airline.hasMany(db.Flight, {
  as: "flights",
  foreignKey: { fieldName: "airlineId" },
});

db.Flight.belongsTo(db.Airline, {
  as: "airline",
  foreignKey: "airlineId",
});

db.User.hasOne(db.Airline, {
  foreignKey: "adminId",
  as: "airline",
});

db.Airline.belongsTo(db.User, { as: "admin" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
