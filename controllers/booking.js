const { Flight, Booking, Passenger, FlightBooking } = require("../db/models");

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
    const newBooking = await Booking.create(req.body); // Booking Contact
    console.log("Booking Contact !!!!!!!!!!!!!!!#1", req.body);
    const booking = req.body.flightIds.map((item) => ({
      //Link Id
      ...item,
      bookingId: newBooking.id,
    }));
    const newFlightBooking = await FlightBooking.bulkCreate(booking); //Link Id
    console.log("newFlightBooking!!!!!!!!!!!!!!!!!!!!!#2", newFlightBooking);
    const newPassenger = req.body.passengers.map((item) => ({
      // Passenger Info
      ...item,
      bookingId: newBooking.id,
    }));
    const newPassengerBooking = await Passenger.bulkCreate(newPassenger); // Passenger Info
    console.log("Passenger Info!!!!!!!!!!!!!!!!!!!!!!!#3", newPassengerBooking);
    res.status(201).json(newBooking);
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
        as: "flights",
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
  console.log(
    "ROBIEROBIEROBIEROBIEROBIEROBIEROBIEROBIEROBIEROBIEROBIE",
    req.body
  );
  const booking = req.body.flightIds.map((item) => ({
    flightId: item,
    bookingId: newBooking.id,
  }));
  console.log(
    "S@KEENAS@KEENAS@KEENAS@KEENAS@KEENAS@KEENAS@KEENAS@KEENA",
    booking
  );
  const newFlightBooking = await FlightBooking.bulkCreate(booking);

  const newPassenger = req.body.passengers.map((item) => ({
    ...item,
    bookingId: newBooking.id,
  }));

  const newPassengerBooking = await Passenger.bulkCreate(newPassenger);

  res.status(201).json(newBooking);
};
