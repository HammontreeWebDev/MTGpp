const router = require("express").Router();
const Scry = require("scryfall-sdk");
const { User, Deck } = require("../../models");

// Get a card by ID
router.get("/:id", async (req, res) => {
    try {
        const cardData = await Scry.Cards.byName(req.params.id);
        if (!cardData) {
            res.status(404).json({ message: "No card found" });
        }
        res.status(200).json(cardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get a random card
router.get("/random", async (req, res) => {
    try {
        const cardData = await Scry.Cards.random();
        res.status(200).json(cardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get a card by name
router.get("/name/:name", async (req, res) => {
    try {
        const cardData = await Scry.Cards.byName(req.params.name);
        if (!cardData) {
            res.status(404).json({ message: "No card found with that name" });
        }
        res.status(200).json(cardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Autocomplete card by name
router.get("/autocomplete/:name", async (req, res) => {
    try {
        const autocomplete = await Scry.Cards.autoCompleteName(req.params.name);
        if (!autocomplete) {
            res.status(404).json({ message: "No cards match provided string" });
        }
        res.status(200).json(autocomplete);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Get an array of cards from a deck ID
router.get("/collection/:id", async (req, res) => {
    try {
        // Get deck data from database
        const deckData = await Deck.findByPk(req.params.id);

        // Does that card exist?
        if (!deckData) {
            res.status(404).json({
                message: `No deck found with id: ${req.params.id}`,
            });
            return;
        }

        // Serialize data
        const deckListData = deckData.get({ plain: true }).deck_list;
        const deckList = JSON.parse(deckListData);

        // Create card collection
        const deckArray = deckList.map((element) =>
            Scry.CardIdentifier.byId(element.id)
        );

        // Scryfall collection call
        const deckCollection = await Scry.Cards.collection(
            ...deckArray
        ).waitForAll();

        // Did it work?
        if (deckCollection) {
            res.status(200).json(deckCollection);
        } else {
            res.status(400).json({ message: "Something weird happened" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
