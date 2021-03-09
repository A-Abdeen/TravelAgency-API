const express = require("express");
const passport = require("passport");
const controllers = require("../controllers/location");
const router = express.Router();

router.param("locationId", async (req, res, next, locationId) => {
  const foundLocation = await controllers.fetchAirline(locationId, next);
  if (foundLocation) {
    req.airline = foundLocation;
    next();
  } else {
    next({
      status: 404,
      message: "Location not found",
    });
  }
});

router.get("/locations", controllers.locationList);

router.post("/locations", controllers.locationCreate);

module.exports = router;
