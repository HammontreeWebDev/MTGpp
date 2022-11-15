const router = require("express").Router();
const Scry = require("scryfall-sdk");

router.get("/:id", async (req, res) => {
    try {
        const cardData = await Scry.Cards.byName(req.params.id);
        if (!cardData) {
            res.status(404).json({ message: "No card found" })
        }
        res.status(200).json(cardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get("/random", async (req, res) => {
    try {
        const cardData = await Scry.Cards.random();
        res.status(200).json(cardData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

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
})

module.exports = router;