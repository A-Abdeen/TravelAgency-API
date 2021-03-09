const express = require("express");
const {
  airlineAdd,
  flightAdd,
  fetchAirline,
} = require("../controllers/airline");
const passport = require("passport");
const router = express.Router();

// // ROUTE PARAM
router.param("airlineId", async (req, res, next, airlineId) => {
  const foundAirline = await fetchAirline(airlineId, next);
  if (foundAirline) {
    req.airline = foundAirline;
    next();
  } else {
    next({
      status: 404,
      message: "Entry not found",
    });
  }
});

// ADD AIRLINE------------------------------------
router.post("/", passport.authenticate("jwt", { session: false }), airlineAdd);

// ADD FLIGHT------------------------------------
router.post(
  "/:airlineId/flights",
  // passport.authenticate("jwt", { session: false }),
  flightAdd
);

module.exports = router;
