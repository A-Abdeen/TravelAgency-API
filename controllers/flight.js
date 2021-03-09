const { Flight, Airline } = require("../db/models");

//-------------------FETCHING

exports.fetchFlight = async (flightId, next) => {
  try {
    const flightFound = await Flight.findByPk(flightId);
    if (flightFound) return flightFound;
    else next({ message: "No Flight Found" });
  } catch (error) {
    next(error);
  }
};

//-------------------LIST

exports.flightList = async (req, res, next) => {
  try {
    const flights = await Flight.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Airline,
        as: "airline",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.status(200).json(flights);
  } catch (err) {
    next(err);
  }
};

//-------------------UPDATE

exports.flightUpdate = async (req, res, next) => {
  try {
    if (req.flight.id === req.airline.userId) {
      {
        await req.flight.update(req.body);
        res.status(200).json(req.flight);
      }
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

//-------------------DELETE

exports.flightDelete = async (req, res, next) => {
  try {
    if (req.user.id === req.airline.userId) {
      await req.flight.destroy();
      res.status(204).end();
    } else {
      const err = new Error("Unauthorized");
      err.status = 401;
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
