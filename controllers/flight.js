const { Flight, Airline } = require("../db/models");

exports.fetchFlight = async (flightId, next) => {
  try {
    const flightFound = await Flight.findByPk(flightId);
    if (flightFound) return flightFound;
    else next({ message: "No Flight Found" });
  } catch (error) {
    next(error);
  }
};

exports.flightList = async (req, res, next) => {
  try {
    const airline = await Airline.findOne({
      where: { adminId: req.user.id },
    });
    const flights = await Flight.findAll({
      where: { airlineId: airline.id },

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

exports.flightUpdate = async (req, res, next) => {
  try {
    const airline = await Airline.findOne({
      where: { adminId: req.user.id },
    });

    if (airline.id === req.flight.airlineId) {
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
