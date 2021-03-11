const express = require("express");
const controller = require("../controllers/airline");
const passport = require("passport");
const router = express.Router();

router.param("airlineId", async (req, res, next, airlineId) => {
  const foundAirline = await controller.fetchAirline(airlineId, next);
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

router.get("/", controller.airlineList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.airlineAdd
);

router.post(
  "/:airlineId/flights",
  passport.authenticate("jwt", { session: false }),
  controller.flightAdd
);

router.put("/:airlineId", controller.airlineUpdate);

router.delete("/:airlineId", controller.airlineDelete);

module.exports = router;
