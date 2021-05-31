const router = require("express").Router();
const competitionRoutes = require("./api/competitions");
const horseRoutes = require("./api/horses");
const userRoutes = require("./api/users");

// Competition routes
router.use("/competitions", competitionRoutes);
router.use("/horses", horseRoutes);
router.use("/users", userRoutes);

module.exports = router;
