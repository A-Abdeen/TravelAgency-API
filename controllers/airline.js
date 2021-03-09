const { Airline, Flight, User } = require("../db/models");

//-------------------FETCH/PARAM

exports.fetchAirline = async (airlineId, next) => {
  try {
    const foundAirline = await Airline.findByPk(airlineId);
    return foundAirline;
  } catch (err) {
    next(err);
  }
};

//-------------------LIST

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

//-------------------ADD

exports.airlineAdd = async (req, res, next) => {
  try {
    // alias of request  --- model format
    req.body.adminId = req.user.id;
    const newAirline = await Airline.create(req.body);
    res.status(201).json(newAirline);
  } catch (err) {
    next(err);
  }
};

//-------------------ADD (FLIGHT)

exports.flightAdd = async (req, res, next) => {
  try {
    if (req.user.id === req.airline.adminId)
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

//-------------------UPDATE

exports.airlineUpdate = async (req, res, next) => {
  try {
    if (req.user.id === req.airline.adminId) {
      // if (req.file);
      await req.airline.update(req.body);
      res.status(200).json(req.airline);
    }
  } catch (err) {
    next(err);
  }
};

//-------------------DELETE
exports.airlineDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.airline.adminId) await req.airline.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
