const router = require("express").Router();
const { Deck } = require("../../models");
const withAuth = require("../../utils/auth");

// get single deck
router.get("/:id", async (req, res) => {
    try {
        // Search the database for a deck with an id that matches params
        const deckData = await Deck.findByPk(req.params.id);
        // console.log(deckData)

        // serialize the data
        const decklist = deckData.get({ plain: true });
        res.render("decklist", decklist);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Change the name of an existing deck
router.put("/", withAuth, async (req, res) => {
    try {
        const deck = await Deck.findByPk(req.body.deck_id);
        deck.deck_name = req.body.deck_name;
        await deck.save();
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
