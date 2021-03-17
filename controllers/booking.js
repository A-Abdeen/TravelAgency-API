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
    const newBooking = await Booking.create(req.body); // Booking Contact
    console.log("Booking Contact !!!!!!!!!!!!!!!#1", req.body);
    const booking = req.body.flightIds.map((item) => ({ //Link Id
      ...item,
      bookingId: newBooking.id,
    }));
    const newFlightBooking = await FlightBooking.bulkCreate(booking); //Link Id
    console.log("newFlightBooking!!!!!!!!!!!!!!!!!!!!!#2", newFlightBooking);
    const newPassenger = req.body.passengers.map((item) => ({  // Passenger Info
      ...item,
      bookingId: newBooking.id,
    }));
    const newPassengerBooking = await Passenger.bulkCreate(newPassenger);// Passenger Info
    console.log("Passenger Info!!!!!!!!!!!!!!!!!!!!!!!#3", newPassengerBooking);
    res.status(201).json(newBooking);
    
  } catch (error) {
    next(error);
  }
};

exports.bookingList = async (req, res, next) => {
  try {
    const booking = await Booking.findAll({
      // attributes: { exclude: ["createdAt", "updatedAt"] },
      // include: {
      //   model: Flight,
      //   as: "flight",
      //   attributes: { exclude: ["createdAt", "updatedAt"] },
      // },
    });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
