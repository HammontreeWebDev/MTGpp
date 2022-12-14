const router = require("express").Router();
const { User, Deck } = require("../../models");
const withAuth = require("../../utils/auth");

// Get a list of decks for the user with id = :id
router.get("/:id", async (req, res) => {
    try {
        const userData = await Deck.findAll({
            where: {
                user_id: req.params.id,
            },
            order: [["createdAt", "ASC"]],
        });
        if (!userData) {
            res.status(404).json({
                message: `No user found with id: ${req.params.id}`,
            });
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new deck
router.post("/", withAuth, async (req, res) => {
    try {
        const deckData = await Deck.create({
            user_id: req.session.user_id,
            deck_name: req.body.deck_name,
        });
        req.session.save(() => {
            req.session.logged_in = true;
            res.status(200).json(deckData);
    });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

// Update an existing deck
router.put("/", withAuth, async (req, res) => {
    try {
        const deckData = await Deck.update(req.body, {
            where: {
                id: req.body.id,
            },
        });

        if (!deckData) {
            res.status(400).json({
                message: "Deck does not exist. Please create it first.",
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete a deck
router.delete("/", withAuth, async (req, res) => {
    try {
        const deckData = await Deck.destroy({
            where: {
                id: req.body.id,
            },
        });

        if (!deckData) {
            res.status(404).json({ message: "No deck found with that id" });
            return;
        }

        res.status(200).json(deckData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
