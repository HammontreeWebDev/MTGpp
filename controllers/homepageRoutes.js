const router = require("express").Router();
const { Deck, User } = require("../models");
const withAuth = require("../utils/auth");
const Scry = require("scryfall-sdk");

// GET route for homepage
router.get("/", async (req, res) => {
    const randomCards = [];
    for (let i = 0; i < 5; i++) {
        const card = await Scry.Cards.random();
        randomCards.push(card);
    }
    console.log(randomCards);
    res.render("homepage", randomCards);
});

// middleware requiring authorization access to route
router.get("/decks", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Deck }],
        });

        const user = userData.get({ plain: true });
        console.log(userData);

        res.render("decks", {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/decklist", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Deck }],
        });

        const user = userData.get({ plain: true });

        let deck;
        user.Deck.forEach((element) => {
            if (element.id === req.body.deck_id) {
                deck = element;
            }
        });

        if (deck) {
            res.render("decklist", deck);
        } else {
            res.status(404).json({
                message: `A deck with id: ${req.body.deck_id} does not exist`,
            });
        }
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
