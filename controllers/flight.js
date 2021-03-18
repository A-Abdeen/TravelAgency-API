const { Flight, Airline, Location, Booking } = require("../db/models");
const { Op } = require("sequelize");

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
    const flights = await Flight.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Airline,
          as: "airline",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Booking,
          as: "bookings",
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
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

exports.flightSearch = async (req, res, next) => {
  try {
    console.log(
      "######################### REQ.BODY ##################################",
      req.body
    );
    let foundFlights;

    if (req.body.trip === "oneway") {
      foundFlights = await Flight.findAll({
        where: {
          [Op.and]: [
            {
              departureDate: req.body.departureDate,
            },
            {
              destinationId: req.body.destinationId,
            },
            {
              originId: req.body.originId,
            },
          ],
        },

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          { model: Airline, as: "airline", attributes: ["name"] },
          // Review location display in Web flight search list
          // { model: Location, as: "destinationL", attributes: ["name"] },
          // { model: Location, as: "originL", attributes: ["name"] },
        ],
      });
    } else {
      foundFlights = await Flight.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                {
                  departureDate: req.body.departureDate,
                },
                {
                  destinationId: req.body.destinationId,
                },
                {
                  originId: req.body.originId,
                },
              ],
            },
            {
              [Op.and]: [
                {
                  arrivalDate: req.body.arrivalDate,
                },
                {
                  destinationId: req.body.originId,
                },
                {
                  originId: req.body.destinationId,
                },
              ],
            },
          ],
        },

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          { model: Airline, as: "airline", attributes: ["name"] },
          // Review location display in Web flight search list
          // { model: Location, as: "destinationL", attributes: ["name"] },
          // { model: Location, as: "originL", attributes: ["name"] },
        ],
      });
    }

    console.log(
      "###################### FOUND FLIGHTS #####################################",
      foundFlights
    );
    if (req.body.class === "economySeats") {
      const economyClass = await foundFlights.filter(
        (flight) => flight.economySeats >= req.body.seats
      );
      console.log(
        "######################### ECONOMY CLASS (RES)##################################",
        economyClass
      );
      res.json(economyClass);
    } else {
      const businessClass = await foundFlights.filter(
        (flight) => flight.businessSeats >= req.body.seats
      );
      res.json(businessClass);
    }
  } catch (err) {
    next(err);
  }
};
