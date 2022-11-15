const router = require("express").Router();
const userRoutes = require("./userRoutes");
const deckRoutes = require("./deckRoutes");
const scryRoutes = require("./scryRoutes");
const decklistRoutes = require("./decklistRoutes")

router.use("/user", userRoutes);
router.use("/deck", deckRoutes);
router.use("/scry", scryRoutes);
router.use("/decklist", decklistRoutes);

module.exports = router;
