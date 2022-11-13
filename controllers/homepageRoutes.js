const router = require('express').Router();
const { Deck, User } = require('../models');
const withAuth = require('../utils/auth');

// GET route for homepage
router.get('/', (req, res) => {
  res.render("homepage");
});

// middleware requiring authorization access to route
router.get('/decks', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Deck }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("decks", {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/decklist', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Deck }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render("decklist", {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/login", (req, res) => {
    // check if already logged in and redirect to /decks
    if (req.session.logged_in) {
      res.redirect("/decks");
      return;
    }
  
    res.render("login");
  });

  router.get("/register", (req, res) => {
    // check if already logged in and redirect to /decks
    if (req.session.logged_in) {
      res.redirect("/decks");
      return;
    }
  
    res.render("register");
  });
  
  module.exports = router;