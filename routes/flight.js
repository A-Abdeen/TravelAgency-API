const express = require("express");
const passport = require("passport");
const controller = require("../controllers/flight");
const router = express.Router();

router.param("flightId", async (req, res, next, flightId) => {
  const flightFound = await controller.fetchFlight(flightId, next);
  if (flightFound) {
    req.flight = flightFound;
    next();
  } else {
    const error = new Error("Flight Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("", controller.flightList);
router.put("/:flightId", controller.flightUpdate);

module.exports = router;
