const router = require('express').Router();
const userRoutes = require("./userRoutes");
const deckRoutes = require("./deckRoutes");
const listRoutes  = require("./list-deckRoutes");

router.use('/user', userRoutes);
router.use('/userdeck', deckRoutes);
router.use('/decklist', listRoutes);

module.exports = router;