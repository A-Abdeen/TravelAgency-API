// Removed authentication for testing purposes

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
    next({
      status: 404,
      message: "Flight not found",
    });
  }
});

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  controller.flightList
);

router.post("/search", controller.flightSearch);

router.put(
  "/:flightId",
  passport.authenticate("jwt", { session: false }),
  controller.flightUpdate
);

module.exports = router;
