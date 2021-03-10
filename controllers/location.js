const { Location, Flight } = require("../db/models");

// FETCH AIRLINE
exports.fetchLocation = async (locationId, next) => {
  try {
    const foundLocation = await Location.findByPk(locationId);
    return foundLocation;
  } catch (error) {
    next(error);
  }
};

exports.locationList = async (req, res, next) => {
  try {
    const location = await Location.findAll({
      include: {
        model: Flight,
        as: "fromLocation",
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
