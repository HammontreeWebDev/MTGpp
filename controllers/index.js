const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const deckRoutes = require("./deckRoutes");
const listRoutes  = require("./list-deckRoutes");

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/userdeck', deckRoutes);
router.use('/decklist', listRoutes);

module.exports = router;