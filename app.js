const db = require("./db/models");
const express = require("express");
const userRoutes = require("./routes/user");

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
app.use(userRoutes);
db.sequelize.sync({ alter: true });

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
