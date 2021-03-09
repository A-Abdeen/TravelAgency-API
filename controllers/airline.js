const { Airline, Flight, Location } = require("../db/models");

// FETCH--------------------------------------
exports.fetchAirline = async (airlineId, next) => {
  try {
    const foundAirline = await Airline.findByPk(airlineId);
    return foundAirline;
  } catch (err) {
    next(err);
  }
};

// ADD AIRLINE------------------------------------
exports.airlineAdd = async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.userId = req.user.id;
    const newAirline = await Airline.create(req.body);
    res.status(201).json(newAirline);
  } catch (error) {
    next(error);
  }
};

// ADD FLIGHT------------------------------------
exports.flightAdd = async (req, res, next) => {
  try {
    // if (req.user.id === req.airline.userId)
    console.log(req.body);
    req.body.airlineId = req.airline.id;

    const newFlight = await Flight.create(req.body);
    res.status(201).json(newFlight);
    // } else {
    // const err = new Error("Unauthorized");
    // err.status = 401;
    // next(err);
  } catch (err) {
    next(err);
  }
};
