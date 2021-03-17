const { Location, Flight } = require("../db/models");

exports.fetchLocation = async (locationId, next) => {
  try {
    const foundLocation = await Location.findByPk(locationId);
    return foundLocation;
  } catch (error) {
    next(error);
  }
};

exports.originList = async (req, res, next) => {
  try {
    const location = await Location.findAll({
      include: {
        model: Flight,
        as: "originL",
        attributes: ["id"],
      },
    });
    res.json(location);
  } catch (error) {
    next(error);
  }
};

exports.destinationList = async (req, res, next) => {
  try {
    const location = await Location.findAll({
      include: {
        model: Flight,
        as: "destinationL",
        attributes: ["id"],
      },
    });
    res.json(location);
  } catch (error) {
    next(error);
  }
};

exports.locationCreate = async (req, res, next) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    next(error);
  }
};
