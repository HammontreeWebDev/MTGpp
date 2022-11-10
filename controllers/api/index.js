const router = require("express").Router();
const userRoutes = require("./userRoutes");
const deckRoutes = require("./deckRoutes");

router.use("/user", userRoutes);
router.use("/deck", deckRoutes);

module.exports = router;
