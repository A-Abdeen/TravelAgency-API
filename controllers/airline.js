const { Airline, Flight, User } = require("../db/models");
const moment = require("moment");
const { duration } = require("moment");

exports.fetchAirline = async (airlineId, next) => {
  try {
    const foundAirline = await Airline.findByPk(airlineId);
    return foundAirline;
  } catch (err) {
    next(err);
  }
};

exports.airlineList = async (req, res, next) => {
  try {
    const airlines = await Airline.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Flight,
          as: "flights",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: User,
          as: "admin",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(airlines);
  } catch (err) {
    next(err);
  }
};

exports.airlineAdd = async (req, res, next) => {
  try {
    req.body.adminId = req.user.id;
    const newAirline = await Airline.create(req.body);
    res.status(201).json(newAirline);
  } catch (err) {
    next(err);
  }
};

//  WIP
exports.flightAdd = async (req, res, next) => {
  try {
    if (req.user.id === req.airline.adminId) {
      req.body.airlineId = req.airline.id;

      const dT = req.body.departureTime; //String 16:00
      const dD = req.body.departureDate; //String 2021-03-17

      const dDateTime = moment(dD + " " + dT, "YYYY-MM-DD HH:mm"); // Concatenation

      const aT = req.body.arrivalTime; //String 18:00
      const aD = req.body.arrivalDate; //String 2021-03-17

      const aDateTime = moment(aD + " " + aT, "YYYY-MM-DD HH:mm");

      const flightDuration = moment.duration(aDateTime.diff(dDateTime)); // Calculate duration

      const a2 = moment(aDateTime).add(flightDuration.as("minutes"), "minutes");
      // Add 30m to arrival -> Departure 2
      const d2 = moment(aDateTime).add(30, "minutes");
      // Add duration to Departure 2 -> Arrival 2

      // Split D2 for date and time

      // Split A2 for date and time

      console.log("############################################", a2);

      const newFlight = await Flight.bulkCreate([
        {
          ...req.body,
          departureTime: req.body.departureTime,
          departureDate: req.body.departureDate,
          arrivalDate: req.body.arrivalDate,
          arrivalTime: req.body.arrivalTime,
          economySeats: req.body.economySeats,
          economyPrice: req.body.economyPrice,
          businessSeats: req.body.businessSeats,
          businessPrice: req.body.businessPrice,
        },
        {
          economySeats: req.body.economySeats,
          economyPrice: req.body.economyPrice,
          businessSeats: req.body.businessSeats,
          businessPrice: req.body.businessPrice,
          departureTime: req.body.arrivalTime, // +30m from arrival
          departureDate: req.body.arrivalDate, // DATE calculated as part of departure time
          arrivalTime: req.body.arrivalTime, // Arrival +30m + duration
          arrivalDate: req.body.arrivalDate, // DATE calculated as part of arrival time
          originId: req.body.destinationId,
          destinationId: req.body.originId,
          airlineId: req.body.airlineId,
        },
      ]);
      res.status(201).json(newFlight);
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
