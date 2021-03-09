const { Flight } = require("../db/models");

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
  console.log(req.body);
  try {
    const flights = await Flight.findAll({
      attributes: req.body,
      include: { model: Flight, as: "flights", attributes: ["id"] },
    });
    res.status(200).json(flights);
  } catch (error) {
    next(error);
  }
};

exports.flightUpdate = async (req, res, next) => {
  try {
    await req.flight.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
