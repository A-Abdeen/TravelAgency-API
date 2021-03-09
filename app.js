const db = require("./db/models");
const express = require("express");
const userRoutes = require("./routes/user");
const airlineRoutes = require("./routes/airline");
const flightRoutes = require("./routes/flight");

const { localStrategy, jwtStrategy } = require("./middleware/passport");

const cors = require("cors");
const path = require("path");

const passport = require("passport");

const app = express();
app.use(express.json());
app.use(cors());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//userRoutes
app.use(userRoutes); // ADD ROUTE IF NEEDED
app.use("/airlines", airlineRoutes);
app.use("/flights", flightRoutes);
db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
