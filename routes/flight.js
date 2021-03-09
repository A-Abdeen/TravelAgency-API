const express = require("express");
const passport = require("passport");
const controller = require("../controllers/flight");
const router = express.Router();

//-------------------FETCH/PARAM
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

//-------------------LIST

router.get("/", controller.flightList);

//-------------------UPDATE

router.put(
  "/:flightId",
  // passport.authenticate("jwt", { session: false }),
  controller.flightUpdate
);

//-------------------DELETE

router.delete(
  "/:flightId",
  // passport.authenticate("jwt", { session: false }),
  controller.flightDelete
);

module.exports = router;
