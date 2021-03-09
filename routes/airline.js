const express = require("express");
const controller = require("../controllers/airline");
const passport = require("passport");
const router = express.Router();

//-------------------FETCH/PARAM

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

//-------------------LIST

router.get("/", controller.airlineList);

//-------------------ADD

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.airlineAdd
);

//-------------------ADD (FLIGHT)

router.post(
  "/:airlineId/flights",
  // passport.authenticate("jwt", { session: false }),
  controller.flightAdd
);

//-------------------UPDATE

router.put("/:airlineId", controller.airlineUpdate);

//-------------------DALETE

router.delete("/:airlineId", controller.airlineDelete);

module.exports = router;
