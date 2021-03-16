const express = require("express");
const passport = require("passport");
const controllers = require("../controllers/booking");
const router = express.Router();

router.param("bookingId", async (req, res, next, bookingId) => {
  const foundBooking = await controllers.fetchBooking(bookingId, next);
  if (foundBooking) {
    req.booking = foundBooking;
    next();
  } else {
    next({
      status: 404,
      message: "Booking not found",
    });
  }
});

router.post("/bookingCreate", controllers.bookingCreate);

router.get("/booking", controllers.bookingList);

module.exports = router;
