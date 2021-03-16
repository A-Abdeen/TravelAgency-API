const db = require("./db/models");
const express = require("express");
const userRoutes = require("./routes/user");
const airlineRoutes = require("./routes/airline");
const flightRoutes = require("./routes/flight");
const locationRoutes = require("./routes/location");
const bookingRoutes = require("./routes/booking");

const { localStrategy, jwtStrategy } = require("./middleware/passport");

const cors = require("cors");

const passport = require("passport");

const app = express();
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use("/airlines", airlineRoutes);
app.use("/flights", flightRoutes);
app.use("/", locationRoutes);
app.use("/", bookingRoutes);

db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
