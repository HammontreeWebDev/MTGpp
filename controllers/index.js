const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./homepageRoutes');
const loginRoutes = require('./loginRoutes');
const decksRoutes = require('./decksRoutes');
const decklistRoutes = require('./decklistRoutes');

router.use('/', homepageRoutes);
router.use('/api', apiRoutes);
router.use('/login', loginRoutes);
router.use('/decks', decksRoutes);
router.use('/decklist', decklistRoutes);

module.exports = router;