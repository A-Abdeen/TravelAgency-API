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

router.post("/locations", controllers.locationCreate);

router.get("/destinations", controllers.destinationList);
router.get("/origins", controllers.originList);

module.exports = router;
