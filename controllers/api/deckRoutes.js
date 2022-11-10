const router = require("express").Router();
const { User, Deck } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", async (req, res) => {
    // Get a list of decks for the user with id = :id
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
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    // Create a new deck
});

router.put("/", withAuth, async (req, res) => {
    // Update an existing deck
});

router.delete("/", withAuth, async (req, res) => {
    // Delete a deck
});

module.exports = router;