const { Flight, Booking, Passenger, FlightBooking } = require("../db/models");

// FETCH AIRLINE
exports.fetchBooking = async (bookingId, next) => {
  try {
    const foundBooking = await Booking.findByPk(bookingId);
    return foundBooking;
  } catch (error) {
    next(error);
  }
};

exports.BookingCreate = async (req, res, next) => {
  try {
    const newBooking = await Booking.create({ userId: req.user.id });
    const cart = req.body.flights.map((item) => ({
      ...item,
      bookingId: newBooking.id,
    }));
    const passengers = req.body.passengers.map((passenger) => ({
      ...passenger,
      bookingId: newBooking.id,
    }));
    await BookingItem.bulkCreate(cart);
    await Passenger.bulkCreate(passengers);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

exports.bookingList = async (req, res, next) => {
  try {
    const booking = await Booking.findAll();
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
