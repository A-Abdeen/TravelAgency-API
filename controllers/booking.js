const { Flight, Booking, Passenger, FlightBooking } = require("../db/models");

exports.fetchBooking = async (bookingId, next) => {
  try {
    const foundBooking = await Booking.findByPk(bookingId);
    return foundBooking;
  } catch (error) {
    next(error);
  }
};

exports.bookingList = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Flight,
        as: "flight",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
// After finalizing WEB booking, will add userId for booking
exports.bookingCreate = async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  const booking = req.body.flightIds.map((item) => ({
    ...item,
    bookingId: newBooking.id,
  }));

  const newFlightBooking = FlightBooking.bulkCreate(booking);

  const newPassenger = req.body.passengers.map((item) => ({
    ...item,
    bookingId: newBooking.id,
  }));

  const newPassengerBooking = Passenger.bulkCreate(newPassenger);

  res.status(201).json(newBooking);
};
